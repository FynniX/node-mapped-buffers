'use strict';

var CollectionType = require('../enums/CollectionType.js');
var Endian = require('../enums/Endian.js');
var VarType = require('../enums/VarType.js');
var index = require('../index.js');

class BufferReader {
    constructor(buffer, endian = Endian.Endian.Little) {
        this._buffer = buffer;
        this._endian = endian;
    }
    readNumber(type) {
        // Check if the buffer has enough bytes
        const varTypeSize = index.MappedBuffer.getVarTypeSize(type);
        if (!varTypeSize || this._buffer.length < varTypeSize)
            return null;
        // Get internal type
        type = this.getInternalType(type);
        // Read value
        let value = null;
        switch (type) {
            case VarType.VarType.int8_t:
                value = this._buffer.readInt8(0);
                break;
            case VarType.VarType.int16_t:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readInt16BE(0);
                else
                    value = this._buffer.readInt16LE(0);
                break;
            case VarType.VarType.int32_t:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readInt32BE(0);
                else
                    value = this._buffer.readInt32LE(0);
                break;
            case VarType.VarType.int64_t:
                if (this._endian === Endian.Endian.Big)
                    value = Number(this._buffer.readBigInt64BE(0));
                else
                    value = Number(this._buffer.readBigInt64LE(0));
                break;
            case VarType.VarType.uint8_t:
                value = this._buffer.readUInt8(0);
                break;
            case VarType.VarType.uint16_t:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readUInt16BE(0);
                else
                    value = this._buffer.readUInt16LE(0);
                break;
            case VarType.VarType.uint32_t:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readUInt32BE(0);
                else
                    value = this._buffer.readUInt32LE(0);
                break;
            case VarType.VarType.uint64_t:
                if (this._endian === Endian.Endian.Big)
                    value = Number(this._buffer.readBigUInt64BE(0));
                else
                    value = Number(this._buffer.readBigUInt64LE(0));
                break;
            case VarType.VarType.float:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readFloatBE(0);
                else
                    value = this._buffer.readFloatLE(0);
                break;
            case VarType.VarType.double:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readDoubleBE(0);
                else
                    value = this._buffer.readDoubleLE(0);
                break;
        }
        // Remove the bytes from the buffer
        this._buffer = this._buffer.subarray(varTypeSize);
        return value;
    }
    readBool(type) {
        // Check if the buffer has enough bytes
        const varTypeSize = index.MappedBuffer.getVarTypeSize(type);
        if (!varTypeSize || this._buffer.length < varTypeSize)
            return null;
        // Get internal type
        type = this.getInternalType(type);
        // Read value
        let value = null;
        switch (type) {
            case VarType.VarType.int8_t:
                value = this._buffer.readInt8(0) === 1;
                break;
            case VarType.VarType.int16_t:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readInt16BE(0) === 1;
                else
                    value = this._buffer.readInt16LE(0) === 1;
                break;
            case VarType.VarType.int32_t:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readInt32BE(0) === 1;
                else
                    value = this._buffer.readInt32LE(0) === 1;
                break;
            case VarType.VarType.int64_t:
                if (this._endian === Endian.Endian.Big)
                    value = Number(this._buffer.readBigInt64BE(0)) === 1;
                else
                    value = Number(this._buffer.readBigInt64LE(0)) === 1;
                break;
            case VarType.VarType.uint8_t:
                value = this._buffer.readUInt8(0) === 1;
                break;
            case VarType.VarType.uint16_t:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readUInt16BE(0) === 1;
                else
                    value = this._buffer.readUInt16LE(0) === 1;
                break;
            case VarType.VarType.uint32_t:
                if (this._endian === Endian.Endian.Big)
                    value = this._buffer.readUInt32BE(0) === 1;
                else
                    value = this._buffer.readUInt32LE(0) === 1;
                break;
            case VarType.VarType.uint64_t:
                if (this._endian === Endian.Endian.Big)
                    value = Number(this._buffer.readBigUInt64BE(0)) === 1;
                else
                    value = Number(this._buffer.readBigUInt64LE(0)) === 1;
                break;
        }
        // Remove the bytes from the buffer
        this._buffer = this._buffer.subarray(varTypeSize);
        return value;
    }
    readArray(template) {
        const arr = [];
        for (let i = 0; i < template.size; i++) {
            // Regular type
            if (typeof template.type === "string") {
                // Boolean type or number type
                if (template.type === VarType.VarType.bool) {
                    arr.push(this.readBool(template.type));
                }
                else {
                    arr.push(this.readNumber(template.type));
                }
            }
            // Collection type
            if (typeof template.type === "object") {
                const collection = template.type;
                // Struct collection
                if (collection.type === CollectionType.CollectionType.Struct) {
                    arr.push(this.readStruct(collection.data));
                }
                // Array collection
                if (collection.type === CollectionType.CollectionType.Array) {
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
            // Regular type
            if (typeof varType === "string") {
                // Boolean type or number type
                if (varType === VarType.VarType.bool) {
                    struct[key] = this.readBool(varType);
                }
                else {
                    struct[key] = this.readNumber(varType);
                }
            }
            // Collection type
            if (typeof varType === "object") {
                const collection = varType;
                // Struct collection
                if (collection.type === CollectionType.CollectionType.Struct) {
                    struct[key] = this.readStruct(collection.data);
                }
                // Array collection
                if (collection.type === CollectionType.CollectionType.Array) {
                    struct[key] = this.readArray(collection.data);
                }
            }
        }
        return struct;
    }
    getInternalType(type) {
        const varTypeSize = index.MappedBuffer.getVarTypeSize(type);
        // Change the type if necessary
        if (type === VarType.VarType.char)
            type = VarType.VarType.int8_t;
        if (type === VarType.VarType.char16_t)
            type = VarType.VarType.int16_t;
        if (type === VarType.VarType.char32_t)
            type = VarType.VarType.int32_t;
        if (type === VarType.VarType.wchar_t && varTypeSize == 2)
            type = VarType.VarType.int16_t;
        if (type === VarType.VarType.wchar_t && varTypeSize == 4)
            type = VarType.VarType.int32_t;
        if (type === VarType.VarType.unsigned_char)
            type = VarType.VarType.uint8_t;
        if (type === VarType.VarType.short_int)
            type = VarType.VarType.int16_t;
        if (type === VarType.VarType.int)
            type = VarType.VarType.int32_t;
        if (type === VarType.VarType.long_int && varTypeSize == 4)
            type = VarType.VarType.int32_t;
        if (type === VarType.VarType.long_int && varTypeSize == 8)
            type = VarType.VarType.int64_t;
        if (type === VarType.VarType.long_long_int)
            type = VarType.VarType.int64_t;
        if (type === VarType.VarType.unsigned_short_int)
            type = VarType.VarType.uint16_t;
        if (type === VarType.VarType.unsigned_int)
            type = VarType.VarType.uint32_t;
        if (type === VarType.VarType.unsigned_long_int && varTypeSize == 4)
            type = VarType.VarType.uint32_t;
        if (type === VarType.VarType.unsigned_long_int && varTypeSize == 8)
            type = VarType.VarType.uint64_t;
        if (type === VarType.VarType.unsigned_long_long_int)
            type = VarType.VarType.uint64_t;
        if (type === VarType.VarType.bool)
            type = VarType.VarType.int8_t;
        return type;
    }
}

exports.BufferReader = BufferReader;
