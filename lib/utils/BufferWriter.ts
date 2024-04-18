import { CollectionType } from "../enums/CollectionType"
import { Endian } from "../enums/Endian"
import { VarType } from "../enums/VarType"
import { MappedBuffer } from "../index"
import { ArrayCollection } from "../interfaces/ArrayCollection"
import { Collection } from "../interfaces/Collection"
import { Struct } from "../interfaces/Struct"
import { StructCollection } from "../interfaces/StructCollection"

export class BufferWriter {
    private _buffer: Buffer = Buffer.alloc(0)
    private readonly _endian: Endian

    constructor(endian: Endian = Endian.Little) {
        this._endian = endian
    }

    public writeNumber(type: VarType, value: number): void {
        // Check weather the type is supported
        const varTypeSize = MappedBuffer.getVarTypeSize(type)
        if (!varTypeSize) return

        // Get internal type
        type = this.getInternalType(type)

        // Write temp buffer
        const tmpBuffer = Buffer.alloc(varTypeSize)
        switch (type) {
            case VarType.int8_t:
                tmpBuffer.writeInt8(value)
                break
            case VarType.int16_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeInt16BE(value)
                else
                    tmpBuffer.writeInt16LE(value)
                break
            case VarType.int32_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeInt32BE(value)
                else
                    tmpBuffer.writeInt32LE(value)
                break
            case VarType.int64_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeBigInt64BE(BigInt(value))
                else
                    tmpBuffer.writeBigInt64LE(BigInt(value))
                break

            case VarType.uint8_t:
                tmpBuffer.writeUInt8(value)
                break
            case VarType.uint16_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeUInt16BE(value)
                else
                    tmpBuffer.writeUInt16LE(value)
                break
            case VarType.uint32_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeUInt32BE(value)
                else
                    tmpBuffer.writeUInt32LE(value)
                break
            case VarType.uint64_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeBigUInt64BE(BigInt(value))
                else
                    tmpBuffer.writeBigUInt64LE(BigInt(value))
                break

            case VarType.float:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeFloatBE(value)
                else
                    tmpBuffer.writeFloatLE(value)
                break
            case VarType.double:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeDoubleBE(value)
                else
                    tmpBuffer.writeDoubleLE(value)
                break
        }

        // Combine the buffers
        this._buffer = Buffer.concat([this._buffer, tmpBuffer])
    }

    public writeBool(type: VarType, value: boolean): void {
        // Check weather the type is supported
        const varTypeSize = MappedBuffer.getVarTypeSize(type)
        if (!varTypeSize) return

        // Get internal type
        type = this.getInternalType(type)

        // Write temp buffer
        const tmpBuffer = Buffer.alloc(varTypeSize)
        switch (type) {
            case VarType.int8_t:
                tmpBuffer.writeInt8(value ? 1 : 0)
                break
            case VarType.int16_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeInt16BE(value ? 1 : 0)
                else
                    tmpBuffer.writeInt16LE(value ? 1 : 0)
                break
            case VarType.int32_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeInt32BE(value ? 1 : 0)
                else
                    tmpBuffer.writeInt32LE(value ? 1 : 0)
                break
            case VarType.int64_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeBigInt64BE(BigInt(value ? 1 : 0))
                else
                    tmpBuffer.writeBigInt64LE(BigInt(value ? 1 : 0))
                break

            case VarType.uint8_t:
                tmpBuffer.writeUInt8(value ? 1 : 0)
                break
            case VarType.uint16_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeUInt16BE(value ? 1 : 0)
                else
                    tmpBuffer.writeUInt16LE(value ? 1 : 0)
                break
            case VarType.uint32_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeUInt32BE(value ? 1 : 0)
                else
                    tmpBuffer.writeUInt32LE(value ? 1 : 0)
                break
            case VarType.uint64_t:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeBigUInt64BE(BigInt(value ? 1 : 0))
                else
                    tmpBuffer.writeBigUInt64LE(BigInt(value ? 1 : 0))
                break

            case VarType.float:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeFloatBE(value ? 1 : 0)
                else
                    tmpBuffer.writeFloatLE(value ? 1 : 0)
                break
            case VarType.double:
                if (this._endian === Endian.Big)
                    tmpBuffer.writeDoubleBE(value ? 1 : 0)
                else
                    tmpBuffer.writeDoubleLE(value ? 1 : 0)
                break
        }

        // Combine the buffers
        this._buffer = Buffer.concat([this._buffer, tmpBuffer])
    }

    public writeArray(template: ArrayCollection, value: unknown[]): void {
        for (let i = 0; i < template.size; i++) {
            // Regular type
            if (typeof template.type === "string") {
                // Boolean type or number type
                if (template.type === VarType.bool) {
                    this.writeBool(template.type, value[i] as boolean)
                } else {
                    this.writeNumber(template.type, value[i] as number)
                }
            }

            // Collection type
            if (typeof template.type === "object") {
                const collection = template.type as Collection

                // Struct collection
                if (collection.type === CollectionType.Struct) {
                    this.writeStruct(collection.data as StructCollection, value[i] as Struct)
                }

                // Array collection
                if (collection.type === CollectionType.Array) {
                    this.writeArray(collection.data as ArrayCollection, value[i] as unknown[])
                }
            }
        }
    }

    public writeStruct(template: StructCollection, value: Struct): void {
        for (const key in template) {
            const varType = template[key]

            // Regular type
            if (typeof varType === "string") {
                // Boolean type or number type
                if (varType === VarType.bool) {
                    this.writeBool(varType, value[key] as boolean)
                } else {
                    this.writeNumber(varType, value[key] as number)
                }
            }

            // Collection type
            if (typeof varType === "object") {
                const collection = varType as Collection

                // Struct collection
                if (collection.type === CollectionType.Struct) {
                    this.writeStruct(collection.data as StructCollection, value[key] as Struct)
                }

                // Array collection
                if (collection.type === CollectionType.Array) {
                    this.writeArray(collection.data as ArrayCollection, value[key] as unknown[])
                }
            }
        }
    }

    public getBuffer(): Buffer {
        return this._buffer
    }

    private getInternalType(type: VarType): VarType {
        const varTypeSize = MappedBuffer.getVarTypeSize(type)

        // Change the type if necessary
        if (type === VarType.char)
            type = VarType.int8_t
        if (type === VarType.char16_t)
            type = VarType.int16_t
        if (type === VarType.char32_t)
            type = VarType.int32_t
        if (type === VarType.wchar_t && varTypeSize == 2)
            type = VarType.int16_t
        if (type === VarType.wchar_t && varTypeSize == 4)
            type = VarType.int32_t
        if (type === VarType.unsigned_char)
            type = VarType.uint8_t

        if (type === VarType.short_int)
            type = VarType.int16_t
        if (type === VarType.int)
            type = VarType.int32_t
        if (type === VarType.long_int && varTypeSize == 4)
            type = VarType.int32_t
        if (type === VarType.long_int && varTypeSize == 8)
            type = VarType.int64_t
        if (type === VarType.long_long_int)
            type = VarType.int64_t

        if (type === VarType.unsigned_short_int)
            type = VarType.uint16_t
        if (type === VarType.unsigned_int)
            type = VarType.uint32_t
        if (type === VarType.unsigned_long_int && varTypeSize == 4)
            type = VarType.uint32_t
        if (type === VarType.unsigned_long_int && varTypeSize == 8)
            type = VarType.uint64_t
        if (type === VarType.unsigned_long_long_int)
            type = VarType.uint64_t

        if (type === VarType.bool)
            type = VarType.int8_t

        return type
    }
}