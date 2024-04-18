import { CollectionType } from '../enums/CollectionType.mjs';
import { Endian } from '../enums/Endian.mjs';
import { VarType } from '../enums/VarType.mjs';
import { MappedBuffer } from '../index.mjs';

class BufferWriter {
    constructor(endian = Endian.Little) {
        this._buffer = Buffer.alloc(0);
        this._endian = endian;
    }
    writeNumber(type, value) {
        // Check weather the type is supported
        const varTypeSize = MappedBuffer.getVarTypeSize(type);
        if (!varTypeSize)
            return;
        // Get internal type
        type = this.getInternalType(type);
        // Write temp buffer
        const tmpBuffer = Buffer.alloc(varTypeSize);
        switch (type) {
            case VarType.int8_t:
                tmpBuffer.writeInt8(value);
                break;
            case VarType.int16_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeInt16BE(value);
                else
                    tmpBuffer.writeInt16LE(value);
                break;
            case VarType.int32_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeInt32BE(value);
                else
                    tmpBuffer.writeInt32LE(value);
                break;
            case VarType.int64_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeBigInt64BE(BigInt(value));
                else
                    tmpBuffer.writeBigInt64LE(BigInt(value));
                break;
            case VarType.uint8_t:
                tmpBuffer.writeUInt8(value);
                break;
            case VarType.uint16_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeUInt16BE(value);
                else
                    tmpBuffer.writeUInt16LE(value);
                break;
            case VarType.uint32_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeUInt32BE(value);
                else
                    tmpBuffer.writeUInt32LE(value);
                break;
            case VarType.uint64_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeBigUInt64BE(BigInt(value));
                else
                    tmpBuffer.writeBigUInt64LE(BigInt(value));
                break;
            case VarType.float:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeFloatBE(value);
                else
                    tmpBuffer.writeFloatLE(value);
                break;
            case VarType.double:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeDoubleBE(value);
                else
                    tmpBuffer.writeDoubleLE(value);
                break;
        }
        // Combine the buffers
        this._buffer = Buffer.concat([this._buffer, tmpBuffer]);
    }
    writeBool(type, value) {
        // Check weather the type is supported
        const varTypeSize = MappedBuffer.getVarTypeSize(type);
        if (!varTypeSize)
            return;
        // Get internal type
        type = this.getInternalType(type);
        // Write temp buffer
        const tmpBuffer = Buffer.alloc(varTypeSize);
        switch (type) {
            case VarType.int8_t:
                tmpBuffer.writeInt8(value ? 1 : 0);
                break;
            case VarType.int16_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeInt16BE(value ? 1 : 0);
                else
                    tmpBuffer.writeInt16LE(value ? 1 : 0);
                break;
            case VarType.int32_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeInt32BE(value ? 1 : 0);
                else
                    tmpBuffer.writeInt32LE(value ? 1 : 0);
                break;
            case VarType.int64_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeBigInt64BE(BigInt(value ? 1 : 0));
                else
                    tmpBuffer.writeBigInt64LE(BigInt(value ? 1 : 0));
                break;
            case VarType.uint8_t:
                tmpBuffer.writeUInt8(value ? 1 : 0);
                break;
            case VarType.uint16_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeUInt16BE(value ? 1 : 0);
                else
                    tmpBuffer.writeUInt16LE(value ? 1 : 0);
                break;
            case VarType.uint32_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeUInt32BE(value ? 1 : 0);
                else
                    tmpBuffer.writeUInt32LE(value ? 1 : 0);
                break;
            case VarType.uint64_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeBigUInt64BE(BigInt(value ? 1 : 0));
                else
                    tmpBuffer.writeBigUInt64LE(BigInt(value ? 1 : 0));
                break;
            case VarType.float:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeFloatBE(value ? 1 : 0);
                else
                    tmpBuffer.writeFloatLE(value ? 1 : 0);
                break;
            case VarType.double:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeDoubleBE(value ? 1 : 0);
                else
                    tmpBuffer.writeDoubleLE(value ? 1 : 0);
                break;
        }
        // Combine the buffers
        this._buffer = Buffer.concat([this._buffer, tmpBuffer]);
    }
    writeArray(template, value) {
        for (let i = 0; i < template.size; i++) {
            // Regular type
            if (typeof template.type === "string") {
                // Boolean type or number type
                if (template.type === VarType.bool) {
                    this.writeBool(template.type, value[i]);
                }
                else {
                    this.writeNumber(template.type, value[i]);
                }
            }
            // Collection type
            if (typeof template.type === "object") {
                const collection = template.type;
                // Struct collection
                if (collection.type === CollectionType.Struct) {
                    this.writeStruct(collection.data, value[i]);
                }
                // Array collection
                if (collection.type === CollectionType.Array) {
                    this.writeArray(collection.data, value[i]);
                }
            }
        }
    }
    writeStruct(template, value) {
        for (const key in template) {
            const varType = template[key];
            // Regular type
            if (typeof varType === "string") {
                // Boolean type or number type
                if (varType === VarType.bool) {
                    this.writeBool(varType, value[key]);
                }
                else {
                    this.writeNumber(varType, value[key]);
                }
            }
            // Collection type
            if (typeof varType === "object") {
                const collection = varType;
                // Struct collection
                if (collection.type === CollectionType.Struct) {
                    this.writeStruct(collection.data, value[key]);
                }
                // Array collection
                if (collection.type === CollectionType.Array) {
                    this.writeArray(collection.data, value[key]);
                }
            }
        }
    }
    getBuffer() {
        return this._buffer;
    }
    getInternalType(type) {
        const varTypeSize = MappedBuffer.getVarTypeSize(type);
        // Change the type if necessary
        if (type === VarType.char)
            type = VarType.int8_t;
        if (type === VarType.char16_t)
            type = VarType.int16_t;
        if (type === VarType.char32_t)
            type = VarType.int32_t;
        if (type === VarType.wchar_t && varTypeSize == 2)
            type = VarType.int16_t;
        if (type === VarType.wchar_t && varTypeSize == 4)
            type = VarType.int32_t;
        if (type === VarType.unsigned_char)
            type = VarType.uint8_t;
        if (type === VarType.short_int)
            type = VarType.int16_t;
        if (type === VarType.int)
            type = VarType.int32_t;
        if (type === VarType.long_int && varTypeSize == 4)
            type = VarType.int32_t;
        if (type === VarType.long_int && varTypeSize == 8)
            type = VarType.int64_t;
        if (type === VarType.long_long_int)
            type = VarType.int64_t;
        if (type === VarType.unsigned_short_int)
            type = VarType.uint16_t;
        if (type === VarType.unsigned_int)
            type = VarType.uint32_t;
        if (type === VarType.unsigned_long_int && varTypeSize == 4)
            type = VarType.uint32_t;
        if (type === VarType.unsigned_long_int && varTypeSize == 8)
            type = VarType.uint64_t;
        if (type === VarType.unsigned_long_long_int)
            type = VarType.uint64_t;
        if (type === VarType.bool)
            type = VarType.int8_t;
        return type;
    }
}

export { BufferWriter };
