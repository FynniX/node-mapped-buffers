'use strict';

var BufferReader = require('./utils/BufferReader.js');
var BufferWriter = require('./utils/BufferWriter.js');
var TypeSizes = require('./utils/TypeSizes.js');

const addon = require('../build/Release/node-mapped-buffer');
class MappedBuffer {
    constructor(bufferPath, struct) {
        this.bufferSize = 0;
        this._template = struct;
        this.bufferPath = bufferPath;
        this.bufferSize = TypeSizes.calculateStructSize(this._template);
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
}

exports.MappedBuffer = MappedBuffer;
