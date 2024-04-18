import { CollectionType } from './enums/CollectionType.mjs';
import { BufferReader } from './utils/BufferReader.mjs';
import { BufferWriter } from './utils/BufferWriter.mjs';

const addon = require('../build/Release/node-mapped-buffer');
class MappedBuffer {
    constructor(bufferPath, struct) {
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
        const reader = new BufferReader(buffer);
        return reader.readStruct(this._template);
    }
    write(data) {
        const writer = new BufferWriter();
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
            if (typeof varType === 'string') {
                size += (_a = MappedBuffer.getVarTypeSize(varType)) !== null && _a !== void 0 ? _a : 0;
            }
            if (typeof varType === 'object') {
                const collection = varType;
                if (collection.type === CollectionType.Struct) {
                    size += MappedBuffer.calculateStructSize(collection.data);
                }
                if (collection.type === CollectionType.Array) {
                    size += MappedBuffer.calculateArraySize(collection.data);
                }
            }
        }
        return size;
    }
    static calculateArraySize(arr) {
        var _a;
        let size = 0;
        if (typeof arr.type === 'string') {
            size += ((_a = MappedBuffer.getVarTypeSize(arr.type)) !== null && _a !== void 0 ? _a : 0) * arr.size;
        }
        if (typeof arr.type === 'object') {
            const arrayType = arr.type;
            if (arrayType.type === CollectionType.Struct) {
                size += MappedBuffer.calculateStructSize(arrayType.data) * arr.size;
            }
            if (arrayType.type === CollectionType.Array) {
                size += MappedBuffer.calculateArraySize(arrayType.data) * arr.size;
            }
        }
        return size;
    }
}

export { MappedBuffer };
