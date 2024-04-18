#include "node_mapped_buffer.h"

char *NodeMappedBuffer::view()
{
    if (buffer != nullptr)
        return buffer;
    buffer = (char *)MapViewOfFile(file, FILE_MAP_ALL_ACCESS, 0, 0, _bufferSize);
    return buffer;
}

NodeMappedBuffer::NodeMappedBuffer(const Napi::CallbackInfo &info) : ObjectWrap(info)
{
    Napi::Env env = info.Env();

    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return;
    }

    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, "You need to pass a string for buffer path")
            .ThrowAsJavaScriptException();
        return;
    }

    if (!info[1].IsNumber())
    {
        Napi::TypeError::New(env, "You need to pass a number for buffer size")
            .ThrowAsJavaScriptException();
        return;
    }

    _bufferPath = info[0].As<Napi::String>().Utf8Value();
    _bufferSize = info[1].As<Napi::Number>().Uint32Value();
}

Napi::Value NodeMappedBuffer::Create(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (file != nullptr)
    {
        Napi::TypeError::New(env, "File mapping already exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    file = CreateFileMappingA(
        INVALID_HANDLE_VALUE, // use paging file
        NULL,                 // default security
        PAGE_READWRITE,       // read/write access
        0,                    // maximum object size (high-order DWORD)
        _bufferSize,          // maximum object size (low-order DWORD)
        _bufferPath.c_str()); // path of mapping object

    if (file == nullptr)
    {
        Napi::TypeError::New(env, "Couldn't create file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    return Napi::Buffer<char>::New(env, view(), _bufferSize);
}

Napi::Value NodeMappedBuffer::Open(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (file != nullptr)
    {
        Napi::TypeError::New(env, "File mapping already exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    file = OpenFileMappingA(
        FILE_MAP_ALL_ACCESS,  // read/write access
        FALSE,                // do not inherit the name
        _bufferPath.c_str()); // path of mapping object

    if (file == nullptr)
    {
        Napi::TypeError::New(env, "Couldn't open file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    return Napi::Buffer<char>::New(env, view(), _bufferSize);
}

Napi::Value NodeMappedBuffer::Read(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (file == nullptr)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    return Napi::Buffer<char>::New(env, view(), _bufferSize);
}

Napi::Value NodeMappedBuffer::Write(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (!info[0].IsBuffer())
    {
        Napi::TypeError::New(env, "You need to pass a buffer for writing")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    Napi::Buffer<char> newBuffer = info[0].As<Napi::Buffer<char>>();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (file == nullptr)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (newBuffer.Length() > _bufferSize)
    {
        Napi::TypeError::New(env, "Buffer is too big")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    std::memcpy(buffer, newBuffer.Data(), newBuffer.Length());

    if (!FlushViewOfFile(buffer, _bufferSize))
    {
        Napi::TypeError::New(env, "Couldn't flush view of file (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    return env.Undefined();
}

Napi::Value NodeMappedBuffer::Close(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (buffer != nullptr)
        UnmapViewOfFile(buffer);

    if (file != nullptr)
        CloseHandle(file);

    buffer = nullptr;
    file = nullptr;

    return env.Undefined();
}

Napi::Function NodeMappedBuffer::GetClass(Napi::Env env)
{
    return DefineClass(
        env,
        "NodeMappedBuffer",
        {
            NodeMappedBuffer::InstanceMethod("create", &NodeMappedBuffer::Create),
            NodeMappedBuffer::InstanceMethod("open", &NodeMappedBuffer::Open),
            NodeMappedBuffer::InstanceMethod("read", &NodeMappedBuffer::Read),
            NodeMappedBuffer::InstanceMethod("write", &NodeMappedBuffer::Write),
            NodeMappedBuffer::InstanceMethod("close", &NodeMappedBuffer::Close),
        });
}

Napi::Value GetVarTypeSize(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, "You need to pass a string for the variable type")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    std::string varType = info[0].As<Napi::String>().Utf8Value();

    if (varType.compare("char") == 0)
        return Napi::Number::New(env, sizeof(char));
    if (varType.compare("char16_t") == 0)
        return Napi::Number::New(env, sizeof(char16_t));
    if (varType.compare("char32_t") == 0)
        return Napi::Number::New(env, sizeof(char32_t));
    if (varType.compare("wchar_t") == 0)
        return Napi::Number::New(env, sizeof(wchar_t));
    if (varType.compare("unsigned_char") == 0)
        return Napi::Number::New(env, sizeof(unsigned char));

    if (varType.compare("short_int") == 0)
        return Napi::Number::New(env, sizeof(short int));
    if (varType.compare("int") == 0)
        return Napi::Number::New(env, sizeof(int));
    if (varType.compare("long_int") == 0)
        return Napi::Number::New(env, sizeof(long int));
    if (varType.compare("long_long_int") == 0)
        return Napi::Number::New(env, sizeof(long long int));

    if (varType.compare("unsigned_short_int") == 0)
        return Napi::Number::New(env, sizeof(unsigned short int));
    if (varType.compare("unsigned_int") == 0)
        return Napi::Number::New(env, sizeof(unsigned int));
    if (varType.compare("unsigned_long_int") == 0)
        return Napi::Number::New(env, sizeof(unsigned long int));
    if (varType.compare("unsigned_long_long_int") == 0)
        return Napi::Number::New(env, sizeof(unsigned long long int));

    if (varType.compare("int8_t") == 0)
        return Napi::Number::New(env, sizeof(int8_t));
    if (varType.compare("int16_t") == 0)
        return Napi::Number::New(env, sizeof(int16_t));
    if (varType.compare("int32_t") == 0)
        return Napi::Number::New(env, sizeof(int32_t));
    if (varType.compare("int64_t") == 0)
        return Napi::Number::New(env, sizeof(int64_t));

    if (varType.compare("uint8_t") == 0)
        return Napi::Number::New(env, sizeof(uint8_t));
    if (varType.compare("uint16_t") == 0)
        return Napi::Number::New(env, sizeof(uint16_t));
    if (varType.compare("uint32_t") == 0)
        return Napi::Number::New(env, sizeof(uint32_t));
    if (varType.compare("uint64_t") == 0)
        return Napi::Number::New(env, sizeof(uint64_t));

    if (varType.compare("float") == 0)
        return Napi::Number::New(env, sizeof(float));
    if (varType.compare("double") == 0)
        return Napi::Number::New(env, sizeof(double));

    if (varType.compare("bool") == 0)
        return Napi::Number::New(env, sizeof(bool));

    Napi::TypeError::New(env, "Variable type was not found")
        .ThrowAsJavaScriptException();
    return env.Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "NodeMappedBuffer"), NodeMappedBuffer::GetClass(env));
    exports.Set(Napi::String::New(env, "getVarTypeSize"), Napi::Function::New<GetVarTypeSize>(env));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)