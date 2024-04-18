import { CollectionType } from "./enums/CollectionType"
import { VarType } from "./enums/VarType"
import { ArrayCollection } from "./interfaces/ArrayCollection"
import { Collection } from "./interfaces/Collection"
import { NodeMappedBuffer } from "./interfaces/NodeMappedBuffer"
import { Struct } from "./interfaces/Struct"
import { StructCollection } from "./interfaces/StructCollection"
import { BufferReader } from "./utils/BufferReader"
import { BufferWriter } from "./utils/BufferWriter"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require('../build/Release/node-mapped-buffer')

/**
 * @class
 * @name MappedBuffer
 * @description A memory mapped buffer.
 */
export class MappedBuffer {
    /**
     * @private
     * @description The addon instance.
     */
    private readonly _addonInstance: NodeMappedBuffer

    /**
     * @name _template
     * @description The template of the struct.
     */
    private readonly _template: StructCollection

    /**
     * @name bufferPath
     * @description The path of the buffer.
     */
    public readonly bufferPath: string

    /**
     * @name bufferSize
     * @description The size of the buffer in bytes.
     */
    public readonly bufferSize: number = 0

    /**
     * @constructor
     * @param bufferPath The path of the buffer.
     * @param struct The struct of the buffer.
     */
    constructor(bufferPath: string, struct: StructCollection) {
        this._template = struct
        this.bufferPath = bufferPath
        this.bufferSize = MappedBuffer.calculateStructSize(this._template)
        this._addonInstance = new addon.NodeMappedBuffer(this.bufferPath, this.bufferSize)
    }

    public create() {
        this._addonInstance.create()
    }

    public open() {
        this._addonInstance.open()
    }

    public read(): Struct | null {
        const buffer = this._addonInstance.read()
        if(!buffer) return null
        const reader = new BufferReader(buffer)
        return reader.readStruct(this._template)
    }

    public write(data: Struct) {
        const writer = new BufferWriter()
        writer.writeStruct(this._template, data)
        this._addonInstance.write(writer.getBuffer())
    }

    public close() {
        this._addonInstance.close()
    }

    static getVarTypeSize(type: VarType): number | undefined {
        return addon.getVarTypeSize(type)
    }

    static calculateStructSize(struct: StructCollection): number {
        let size = 0

        for (const key in struct) {
            const varType = struct[key]

            // Regular type
            if (typeof varType === "string") {
                size += MappedBuffer.getVarTypeSize(varType) ?? 0
            }

            // Collection type
            if (typeof varType === "object") {
                const collection = varType as Collection

                // Struct collection
                if (collection.type === CollectionType.Struct) {
                    size += MappedBuffer.calculateStructSize(collection.data as StructCollection)
                }

                // Array collection
                if (collection.type === CollectionType.Array) {
                    size += MappedBuffer.calculateArraySize(collection.data as ArrayCollection)
                }
            }
        }

        return size
    }

    static calculateArraySize(arr: ArrayCollection): number {
        let size = 0;

        // Regular type
        if (typeof arr.type === "string") {
            size += (MappedBuffer.getVarTypeSize(arr.type) ?? 0) * arr.size
        }

        // Collection type
        if (typeof arr.type === "object") {
            const arrayType = arr.type as Collection

            // Struct collection
            if (arrayType.type === CollectionType.Struct) {
                size += MappedBuffer.calculateStructSize(arrayType.data as StructCollection) * arr.size
            }

            // Array collection
            if (arrayType.type === CollectionType.Array) {
                size += MappedBuffer.calculateArraySize(arrayType.data as ArrayCollection) * arr.size
            }
        }

        return size
    }
}