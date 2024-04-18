'use strict';

var index = require('../index.js');
var CollectionType = require('../enums/CollectionType.js');
var Endian = require('../enums/Endian.js');
var VarType = require('../enums/VarType.js');
var BufferWriter = require('../utils/BufferWriter.js');
var StructBuilder = require('../utils/StructBuilder.js');
var BufferReader = require('../utils/BufferReader.js');
var TypeSizes = require('../utils/TypeSizes.js');



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
exports.BufferWriter = BufferWriter.BufferWriter;
exports.StructBuilder = StructBuilder.StructBuilder;
exports.BufferReader = BufferReader.BufferReader;
exports.calculateArraySize = TypeSizes.calculateArraySize;
exports.calculateStructSize = TypeSizes.calculateStructSize;
exports.getVarTypeSize = TypeSizes.getVarTypeSize;
