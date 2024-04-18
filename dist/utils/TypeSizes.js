'use strict';

var CollectionType = require('../enums/CollectionType.js');

const addon = require('../../build/Release/node-mapped-buffer');
const getVarTypeSize = (type) => {
    return addon.getVarTypeSize(type);
};
const calculateStructSize = (struct) => {
    var _a;
    let size = 0;
    for (const key in struct) {
        const varType = struct[key];
        if (typeof varType === 'string') {
            size += (_a = getVarTypeSize(varType)) !== null && _a !== void 0 ? _a : 0;
        }
        if (typeof varType === 'object') {
            const collection = varType;
            if (collection.type === CollectionType.CollectionType.Struct) {
                size += calculateStructSize(collection.data);
            }
            if (collection.type === CollectionType.CollectionType.Array) {
                size += calculateArraySize(collection.data);
            }
        }
    }
    return size;
};
const calculateArraySize = (arr) => {
    var _a;
    let size = 0;
    if (typeof arr.type === 'string') {
        size += ((_a = getVarTypeSize(arr.type)) !== null && _a !== void 0 ? _a : 0) * arr.size;
    }
    if (typeof arr.type === 'object') {
        const arrayType = arr.type;
        if (arrayType.type === CollectionType.CollectionType.Struct) {
            size += calculateStructSize(arrayType.data) * arr.size;
        }
        if (arrayType.type === CollectionType.CollectionType.Array) {
            size += calculateArraySize(arrayType.data) * arr.size;
        }
    }
    return size;
};

exports.calculateArraySize = calculateArraySize;
exports.calculateStructSize = calculateStructSize;
exports.getVarTypeSize = getVarTypeSize;
