#pragma once

//------
#define MIN_WIN_VER 0x0501

#ifndef WINVER
#define WINVER MIN_WIN_VER
#endif

#ifndef _WIN32_WINNT
#define _WIN32_WINNT MIN_WIN_VER
#endif

#pragma warning(disable : 4996) //_CRT_SECURE_NO_WARNINGS

#include <iostream>
#include <napi.h>
#include <windows.h>

class NodeMappedBuffer : public Napi::ObjectWrap<NodeMappedBuffer>
{
private:
    HANDLE file = nullptr;
    char *buffer = nullptr;
    std::string _bufferPath;
    uint32_t _bufferSize = 0;
    char *view();

public:
    NodeMappedBuffer(const Napi::CallbackInfo &);
    Napi::Value Create(const Napi::CallbackInfo &);
    Napi::Value Open(const Napi::CallbackInfo &);
    Napi::Value Read(const Napi::CallbackInfo &);
    Napi::Value Write(const Napi::CallbackInfo &);
    Napi::Value Close(const Napi::CallbackInfo &);
    static Napi::Function GetClass(Napi::Env);
};

Napi::Value GetVarTypeSize(const Napi::CallbackInfo &);
Napi::Object Init(Napi::Env env, Napi::Object exports);