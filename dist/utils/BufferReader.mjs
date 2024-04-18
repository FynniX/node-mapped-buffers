import { CollectionType } from '../enums/CollectionType.mjs';
import { Endian } from '../enums/Endian.mjs';
import { VarType } from '../enums/VarType.mjs';
import { MappedBuffer } from '../index.mjs';

class BufferReader {
    constructor(buffer, endian = Endian.Little) {
        this._buffer = buffer;
        this._endian = endian;
    }
    readNumber(type) {
        const varTypeSize = MappedBuffer.getVarTypeSize(type);
        if (!varTypeSize || this._buffer.length < varTypeSize)
            return null;
        type = this.getInternalType(type);
        let value = null;
        switch (type) {
            case VarType.int8_t:
                value = this._buffer.readInt8(0);
                break;
            case VarType.int16_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readInt16BE(0);
                else
                    value = this._buffer.readInt16LE(0);
                break;
            case VarType.int32_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readInt32BE(0);
                else
                    value = this._buffer.readInt32LE(0);
                break;
            case VarType.int64_t:
                if (this._endian === Endian.Big)
                    value = Number(this._buffer.readBigInt64BE(0));
                else
                    value = Number(this._buffer.readBigInt64LE(0));
                break;
            case VarType.uint8_t:
                value = this._buffer.readUInt8(0);
                break;
            case VarType.uint16_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readUInt16BE(0);
                else
                    value = this._buffer.readUInt16LE(0);
                break;
            case VarType.uint32_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readUInt32BE(0);
                else
                    value = this._buffer.readUInt32LE(0);
                break;
            case VarType.uint64_t:
                if (this._endian === Endian.Big)
                    value = Number(this._buffer.readBigUInt64BE(0));
                else
                    value = Number(this._buffer.readBigUInt64LE(0));
                break;
            case VarType.float:
                if (this._endian === Endian.Big)
                    value = this._buffer.readFloatBE(0);
                else
                    value = this._buffer.readFloatLE(0);
                break;
            case VarType.double:
                if (this._endian === Endian.Big)
                    value = this._buffer.readDoubleBE(0);
                else
                    value = this._buffer.readDoubleLE(0);
                break;
        }
        this._buffer = this._buffer.subarray(varTypeSize);
        return value;
    }
    readBool(type) {
        const varTypeSize = MappedBuffer.getVarTypeSize(type);
        if (!varTypeSize || this._buffer.length < varTypeSize)
            return null;
        type = this.getInternalType(type);
        let value = null;
        switch (type) {
            case VarType.int8_t:
                value = this._buffer.readInt8(0) === 1;
                break;
            case VarType.int16_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readInt16BE(0) === 1;
                else
                    value = this._buffer.readInt16LE(0) === 1;
                break;
            case VarType.int32_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readInt32BE(0) === 1;
                else
                    value = this._buffer.readInt32LE(0) === 1;
                break;
            case VarType.int64_t:
                if (this._endian === Endian.Big)
                    value = Number(this._buffer.readBigInt64BE(0)) === 1;
                else
                    value = Number(this._buffer.readBigInt64LE(0)) === 1;
                break;
            case VarType.uint8_t:
                value = this._buffer.readUInt8(0) === 1;
                break;
            case VarType.uint16_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readUInt16BE(0) === 1;
                else
                    value = this._buffer.readUInt16LE(0) === 1;
                break;
            case VarType.uint32_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readUInt32BE(0) === 1;
                else
                    value = this._buffer.readUInt32LE(0) === 1;
                break;
            case VarType.uint64_t:
                if (this._endian === Endian.Big)
                    value = Number(this._buffer.readBigUInt64BE(0)) === 1;
                else
                    value = Number(this._buffer.readBigUInt64LE(0)) === 1;
                break;
        }
        this._buffer = this._buffer.subarray(varTypeSize);
        return value;
    }
    readArray(template) {
        const arr = [];
        for (let i = 0; i < template.size; i++) {
            if (typeof template.type === "string") {
                if (template.type === VarType.bool) {
                    arr.push(this.readBool(template.type));
                }
                else {
                    arr.push(this.readNumber(template.type));
                }
            }
            if (typeof template.type === "object") {
                const collection = template.type;
                if (collection.type === CollectionType.Struct) {
                    arr.push(this.readStruct(collection.data));
                }
                if (collection.type === CollectionType.Array) {
                    arr.push(this.readArray(collection.data));
                }
            }
        }
        return arr;
    }
    readStruct(template) {
        const struct = {};
        for (const key in template) {
            const varType = template[key];
            if (typeof varType === "string") {
                if (varType === VarType.bool) {
                    struct[key] = this.readBool(varType);
                }
                else {
                    struct[key] = this.readNumber(varType);
                }
            }
            if (typeof varType === "object") {
                const collection = varType;
                if (collection.type === CollectionType.Struct) {
                    struct[key] = this.readStruct(collection.data);
                }
                if (collection.type === CollectionType.Array) {
                    struct[key] = this.readArray(collection.data);
                }
            }
        }
        return struct;
    }
    getInternalType(type) {
        const varTypeSize = MappedBuffer.getVarTypeSize(type);
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

export { BufferReader };
