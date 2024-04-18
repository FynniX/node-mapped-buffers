import { BufferReader } from './utils/BufferReader.mjs';
import { BufferWriter } from './utils/BufferWriter.mjs';
import { calculateStructSize } from './utils/TypeSizes.mjs';

const addon = require('../build/Release/node-mapped-buffer');
class MappedBuffer {
    constructor(bufferPath, struct) {
        this.bufferSize = 0;
        this._template = struct;
        this.bufferPath = bufferPath;
        this.bufferSize = calculateStructSize(this._template);
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
}

export { MappedBuffer };
