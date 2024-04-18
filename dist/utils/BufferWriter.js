'use strict';

var CollectionType = require('../enums/CollectionType.js');
var Endian = require('../enums/Endian.js');
var VarType = require('../enums/VarType.js');
var TypeSizes = require('./TypeSizes.js');

class BufferWriter {
    constructor(endian = Endian.Endian.Little) {
        this._buffer = Buffer.alloc(0);
        this._endian = endian;
    }
    writeNumber(type, value) {
        const varTypeSize = TypeSizes.getVarTypeSize(type);
        if (!varTypeSize)
            return;
        type = this.getInternalType(type);
        const tmpBuffer = Buffer.alloc(varTypeSize);
        switch (type) {
            case VarType.VarType.int8_t:
                tmpBuffer.writeInt8(value);
                break;
            case VarType.VarType.int16_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeInt16BE(value);
                else
                    tmpBuffer.writeInt16LE(value);
                break;
            case VarType.VarType.int32_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeInt32BE(value);
                else
                    tmpBuffer.writeInt32LE(value);
                break;
            case VarType.VarType.int64_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeBigInt64BE(BigInt(value));
                else
                    tmpBuffer.writeBigInt64LE(BigInt(value));
                break;
            case VarType.VarType.uint8_t:
                tmpBuffer.writeUInt8(value);
                break;
            case VarType.VarType.uint16_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeUInt16BE(value);
                else
                    tmpBuffer.writeUInt16LE(value);
                break;
            case VarType.VarType.uint32_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeUInt32BE(value);
                else
                    tmpBuffer.writeUInt32LE(value);
                break;
            case VarType.VarType.uint64_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeBigUInt64BE(BigInt(value));
                else
                    tmpBuffer.writeBigUInt64LE(BigInt(value));
                break;
            case VarType.VarType.float:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeFloatBE(value);
                else
                    tmpBuffer.writeFloatLE(value);
                break;
            case VarType.VarType.double:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeDoubleBE(value);
                else
                    tmpBuffer.writeDoubleLE(value);
                break;
        }
        this._buffer = Buffer.concat([this._buffer, tmpBuffer]);
    }
    writeBool(type, value) {
        const varTypeSize = TypeSizes.getVarTypeSize(type);
        if (!varTypeSize)
            return;
        type = this.getInternalType(type);
        const tmpBuffer = Buffer.alloc(varTypeSize);
        switch (type) {
            case VarType.VarType.int8_t:
                tmpBuffer.writeInt8(value ? 1 : 0);
                break;
            case VarType.VarType.int16_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeInt16BE(value ? 1 : 0);
                else
                    tmpBuffer.writeInt16LE(value ? 1 : 0);
                break;
            case VarType.VarType.int32_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeInt32BE(value ? 1 : 0);
                else
                    tmpBuffer.writeInt32LE(value ? 1 : 0);
                break;
            case VarType.VarType.int64_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeBigInt64BE(BigInt(value ? 1 : 0));
                else
                    tmpBuffer.writeBigInt64LE(BigInt(value ? 1 : 0));
                break;
            case VarType.VarType.uint8_t:
                tmpBuffer.writeUInt8(value ? 1 : 0);
                break;
            case VarType.VarType.uint16_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeUInt16BE(value ? 1 : 0);
                else
                    tmpBuffer.writeUInt16LE(value ? 1 : 0);
                break;
            case VarType.VarType.uint32_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeUInt32BE(value ? 1 : 0);
                else
                    tmpBuffer.writeUInt32LE(value ? 1 : 0);
                break;
            case VarType.VarType.uint64_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeBigUInt64BE(BigInt(value ? 1 : 0));
                else
                    tmpBuffer.writeBigUInt64LE(BigInt(value ? 1 : 0));
                break;
            case VarType.VarType.float:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeFloatBE(value ? 1 : 0);
                else
                    tmpBuffer.writeFloatLE(value ? 1 : 0);
                break;
            case VarType.VarType.double:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeDoubleBE(value ? 1 : 0);
                else
                    tmpBuffer.writeDoubleLE(value ? 1 : 0);
                break;
        }
        this._buffer = Buffer.concat([this._buffer, tmpBuffer]);
    }
    writeArray(template, value) {
        for (let i = 0; i < template.size; i++) {
            if (typeof template.type === 'string') {
                if (template.type === VarType.VarType.bool) {
                    this.writeBool(template.type, value[i]);
                }
                else {
                    this.writeNumber(template.type, value[i]);
                }
            }
            if (typeof template.type === 'object') {
                const collection = template.type;
                if (collection.type === CollectionType.CollectionType.Struct) {
                    this.writeStruct(collection.data, value[i]);
                }
                if (collection.type === CollectionType.CollectionType.Array) {
                    this.writeArray(collection.data, value[i]);
                }
            }
        }
    }
    writeStruct(template, value) {
        for (const key in template) {
            const varType = template[key];
            if (typeof varType === 'string') {
                if (varType === VarType.VarType.bool) {
                    this.writeBool(varType, value[key]);
                }
                else {
                    this.writeNumber(varType, value[key]);
                }
            }
            if (typeof varType === 'object') {
                const collection = varType;
                if (collection.type === CollectionType.CollectionType.Struct) {
                    this.writeStruct(collection.data, value[key]);
                }
                if (collection.type === CollectionType.CollectionType.Array) {
                    this.writeArray(collection.data, value[key]);
                }
            }
        }
    }
    getBuffer() {
        return this._buffer;
    }
    getInternalType(type) {
        const varTypeSize = TypeSizes.getVarTypeSize(type);
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

exports.BufferWriter = BufferWriter;
