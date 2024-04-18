import { CollectionType } from '../enums/CollectionType'
import { Endian } from '../enums/Endian'
import { VarType } from '../enums/VarType'
import { ArrayCollection } from '../interfaces/ArrayCollection'
import { Collection } from '../interfaces/Collection'
import { Struct } from '../interfaces/Struct'
import { StructCollection } from '../interfaces/StructCollection'
import { getVarTypeSize } from './TypeSizes'

export class BufferReader {
  private _buffer: Buffer
  private readonly _endian: Endian

  constructor(buffer: Buffer, endian: Endian = Endian.Little) {
    this._buffer = buffer
    this._endian = endian
  }

  public readNumber(type: VarType): number | null {
    // Check if the buffer has enough bytes
    const varTypeSize = getVarTypeSize(type)
    if (!varTypeSize || this._buffer.length < varTypeSize) return null

    // Get internal type
    type = this.getInternalType(type)

    // Read value
    let value = null
    switch (type) {
      case VarType.int8_t:
        value = this._buffer.readInt8(0)
        break
      case VarType.int16_t:
        if (this._endian === Endian.Big) value = this._buffer.readInt16BE(0)
        else value = this._buffer.readInt16LE(0)
        break
      case VarType.int32_t:
        if (this._endian === Endian.Big) value = this._buffer.readInt32BE(0)
        else value = this._buffer.readInt32LE(0)
        break
      case VarType.int64_t:
        if (this._endian === Endian.Big) value = Number(this._buffer.readBigInt64BE(0))
        else value = Number(this._buffer.readBigInt64LE(0))
        break

      case VarType.uint8_t:
        value = this._buffer.readUInt8(0)
        break
      case VarType.uint16_t:
        if (this._endian === Endian.Big) value = this._buffer.readUInt16BE(0)
        else value = this._buffer.readUInt16LE(0)
        break
      case VarType.uint32_t:
        if (this._endian === Endian.Big) value = this._buffer.readUInt32BE(0)
        else value = this._buffer.readUInt32LE(0)
        break
      case VarType.uint64_t:
        if (this._endian === Endian.Big) value = Number(this._buffer.readBigUInt64BE(0))
        else value = Number(this._buffer.readBigUInt64LE(0))
        break

      case VarType.float:
        if (this._endian === Endian.Big) value = this._buffer.readFloatBE(0)
        else value = this._buffer.readFloatLE(0)
        break
      case VarType.double:
        if (this._endian === Endian.Big) value = this._buffer.readDoubleBE(0)
        else value = this._buffer.readDoubleLE(0)
        break
    }

    // Remove the bytes from the buffer
    this._buffer = this._buffer.subarray(varTypeSize)

    return value
  }

  public readBool(type: VarType): boolean | null {
    // Check if the buffer has enough bytes
    const varTypeSize = getVarTypeSize(type)
    if (!varTypeSize || this._buffer.length < varTypeSize) return null

    // Get internal type
    type = this.getInternalType(type)

    // Read value
    let value = null
    switch (type) {
      case VarType.int8_t:
        value = this._buffer.readInt8(0) === 1
        break
      case VarType.int16_t:
        if (this._endian === Endian.Big) value = this._buffer.readInt16BE(0) === 1
        else value = this._buffer.readInt16LE(0) === 1
        break
      case VarType.int32_t:
        if (this._endian === Endian.Big) value = this._buffer.readInt32BE(0) === 1
        else value = this._buffer.readInt32LE(0) === 1
        break
      case VarType.int64_t:
        if (this._endian === Endian.Big) value = Number(this._buffer.readBigInt64BE(0)) === 1
        else value = Number(this._buffer.readBigInt64LE(0)) === 1
        break

      case VarType.uint8_t:
        value = this._buffer.readUInt8(0) === 1
        break
      case VarType.uint16_t:
        if (this._endian === Endian.Big) value = this._buffer.readUInt16BE(0) === 1
        else value = this._buffer.readUInt16LE(0) === 1
        break
      case VarType.uint32_t:
        if (this._endian === Endian.Big) value = this._buffer.readUInt32BE(0) === 1
        else value = this._buffer.readUInt32LE(0) === 1
        break
      case VarType.uint64_t:
        if (this._endian === Endian.Big) value = Number(this._buffer.readBigUInt64BE(0)) === 1
        else value = Number(this._buffer.readBigUInt64LE(0)) === 1
        break
    }

    // Remove the bytes from the buffer
    this._buffer = this._buffer.subarray(varTypeSize)

    return value
  }

  public readArray(template: ArrayCollection): unknown[] {
    const arr: unknown[] = []
    for (let i = 0; i < template.size; i++) {
      // Regular type
      if (typeof template.type === 'string') {
        // Boolean type or number type
        if (template.type === VarType.bool) {
          arr.push(this.readBool(template.type))
        } else {
          arr.push(this.readNumber(template.type))
        }
      }

      // Collection type
      if (typeof template.type === 'object') {
        const collection = template.type as Collection

        // Struct collection
        if (collection.type === CollectionType.Struct) {
          arr.push(this.readStruct(collection.data as StructCollection))
        }

        // Array collection
        if (collection.type === CollectionType.Array) {
          arr.push(this.readArray(collection.data as ArrayCollection))
        }
      }
    }

    return arr
  }

  public readStruct(template: StructCollection): Struct | null {
    const struct = {} as Struct

    for (const key in template) {
      const varType = template[key]

      // Regular type
      if (typeof varType === 'string') {
        // Boolean type or number type
        if (varType === VarType.bool) {
          struct[key] = this.readBool(varType)
        } else {
          struct[key] = this.readNumber(varType)
        }
      }

      // Collection type
      if (typeof varType === 'object') {
        const collection = varType as Collection

        // Struct collection
        if (collection.type === CollectionType.Struct) {
          struct[key] = this.readStruct(collection.data as StructCollection)
        }

        // Array collection
        if (collection.type === CollectionType.Array) {
          struct[key] = this.readArray(collection.data as ArrayCollection)
        }
      }
    }

    return struct
  }

  private getInternalType(type: VarType): VarType {
    const varTypeSize = getVarTypeSize(type)

    // Change the type if necessary
    if (type === VarType.char) type = VarType.int8_t
    if (type === VarType.char16_t) type = VarType.int16_t
    if (type === VarType.char32_t) type = VarType.int32_t
    if (type === VarType.wchar_t && varTypeSize == 2) type = VarType.int16_t
    if (type === VarType.wchar_t && varTypeSize == 4) type = VarType.int32_t
    if (type === VarType.unsigned_char) type = VarType.uint8_t

    if (type === VarType.short_int) type = VarType.int16_t
    if (type === VarType.int) type = VarType.int32_t
    if (type === VarType.long_int && varTypeSize == 4) type = VarType.int32_t
    if (type === VarType.long_int && varTypeSize == 8) type = VarType.int64_t
    if (type === VarType.long_long_int) type = VarType.int64_t

    if (type === VarType.unsigned_short_int) type = VarType.uint16_t
    if (type === VarType.unsigned_int) type = VarType.uint32_t
    if (type === VarType.unsigned_long_int && varTypeSize == 4) type = VarType.uint32_t
    if (type === VarType.unsigned_long_int && varTypeSize == 8) type = VarType.uint64_t
    if (type === VarType.unsigned_long_long_int) type = VarType.uint64_t

    if (type === VarType.bool) type = VarType.int8_t

    return type
  }
}
