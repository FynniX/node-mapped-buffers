'use strict';

var CollectionType = require('./enums/CollectionType.js');
var BufferReader = require('./utils/BufferReader.js');
var BufferWriter = require('./utils/BufferWriter.js');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require('../build/Release/node-mapped-buffer');
/**
 * @class
 * @name MappedBuffer
 * @description A memory mapped buffer.
 */
class MappedBuffer {
    /**
     * @constructor
     * @param bufferPath The path of the buffer.
     * @param struct The struct of the buffer.
     */
    constructor(bufferPath, struct) {
        /**
         * @name bufferSize
         * @description The size of the buffer in bytes.
         */
        this.bufferSize = 0;
        this._template = struct;
        this.bufferPath = bufferPath;
        this.bufferSize = MappedBuffer.calculateStructSize(this._template);
        this._addonInstance = new addon.NodeMappedBuffer(this.bufferPath, this.bufferSize);
    }
    create() {
        this._addonInstance.create();
    }
    open() {
        this._addonInstance.open();
    }
    read() {
        const buffer = this._addonInstance.read();
        if (!buffer)
            return null;
        const reader = new BufferReader.BufferReader(buffer);
        return reader.readStruct(this._template);
    }
    write(data) {
        const writer = new BufferWriter.BufferWriter();
        writer.writeStruct(this._template, data);
        this._addonInstance.write(writer.getBuffer());
    }
    close() {
        this._addonInstance.close();
    }
    static getVarTypeSize(type) {
        return addon.getVarTypeSize(type);
    }
    static calculateStructSize(struct) {
        var _a;
        let size = 0;
        for (const key in struct) {
            const varType = struct[key];
            // Regular type
            if (typeof varType === "string") {
                size += (_a = MappedBuffer.getVarTypeSize(varType)) !== null && _a !== void 0 ? _a : 0;
            }
            // Collection type
            if (typeof varType === "object") {
                const collection = varType;
                // Struct collection
                if (collection.type === CollectionType.CollectionType.Struct) {
                    size += MappedBuffer.calculateStructSize(collection.data);
                }
                // Array collection
                if (collection.type === CollectionType.CollectionType.Array) {
                    size += MappedBuffer.calculateArraySize(collection.data);
                }
            }
        }
        return size;
    }
    static calculateArraySize(arr) {
        var _a;
        let size = 0;
        // Regular type
        if (typeof arr.type === "string") {
            size += ((_a = MappedBuffer.getVarTypeSize(arr.type)) !== null && _a !== void 0 ? _a : 0) * arr.size;
        }
        // Collection type
        if (typeof arr.type === "object") {
            const arrayType = arr.type;
            // Struct collection
            if (arrayType.type === CollectionType.CollectionType.Struct) {
                size += MappedBuffer.calculateStructSize(arrayType.data) * arr.size;
            }
            // Array collection
            if (arrayType.type === CollectionType.CollectionType.Array) {
                size += MappedBuffer.calculateArraySize(arrayType.data) * arr.size;
            }
        }
        return size;
    }
}

exports.MappedBuffer = MappedBuffer;
