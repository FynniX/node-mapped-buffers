'use strict';

var index = require('../index.js');
var CollectionType = require('../enums/CollectionType.js');
var Endian = require('../enums/Endian.js');
var VarType = require('../enums/VarType.js');
var BufferReader = require('../utils/BufferReader.js');
var BufferWriter = require('../utils/BufferWriter.js');
var TypeSizes = require('../utils/TypeSizes.js');
var StructBuilder = require('../utils/StructBuilder.js');



exports.MappedBuffer = index.MappedBuffer;
Object.defineProperty(exports, "CollectionType", {
	enumerable: true,
	get: function () { return CollectionType.CollectionType; }
});
Object.defineProperty(exports, "Endian", {
	enumerable: true,
	get: function () { return Endian.Endian; }
});
Object.defineProperty(exports, "VarType", {
	enumerable: true,
	get: function () { return VarType.VarType; }
});
exports.BufferReader = BufferReader.BufferReader;
exports.BufferWriter = BufferWriter.BufferWriter;
exports.calculateArraySize = TypeSizes.calculateArraySize;
exports.calculateStructSize = TypeSizes.calculateStructSize;
exports.getVarTypeSize = TypeSizes.getVarTypeSize;
exports.StructBuilder = StructBuilder.StructBuilder;
