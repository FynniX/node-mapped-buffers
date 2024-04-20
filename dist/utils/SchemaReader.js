'use strict';

var antlr4 = require('antlr4');
var SchemaLexer = require('./parser/SchemaLexer.js');
var SchemaParser = require('./parser/SchemaParser.js');
var fs = require('fs');
var path = require('path');
var DeclarationType = require('../enums/DeclarationType.js');
var StructBuilder = require('./StructBuilder.js');
var VarType = require('../enums/VarType.js');

class SchemaReader {
    constructor() {
        this.structs = new Map();
    }
    visitSchema(ctx) {
        if (!ctx)
            return;
        for (const struct of ctx.struct_list())
            this.visitStruct(struct);
    }
    visitStruct(ctx) {
        if (!ctx)
            return;
        const builder = new StructBuilder.StructBuilder();
        for (const type of ctx.type__list())
            this.visitType(type, builder);
        this.structs.set(ctx.NAME().getText(), builder.build());
    }
    visitType(ctx, builder) {
        if (!ctx)
            return;
        const name = ctx.NAME().getText();
        const type = this.getDeclarationType(ctx);
        const array = this.getArrayLength(ctx.array());
        if (type === DeclarationType.DeclarationType.Primitive) {
            const varType = this.getVarType(ctx.primitiveType_list());
            if (array.length === 0) {
                builder.addVariable(name, varType);
                return;
            }
            let arr = null;
            for (let i = 1; i < array.length; i++)
                arr = StructBuilder.StructBuilder.createArray(arr === null ? varType : arr, array[i]);
            if (arr !== null)
                builder.addArray(name, arr, array[0]);
        }
        if (type === DeclarationType.DeclarationType.User) {
            const type = ctx.userType().getText();
            if (!this.structs.has(type))
                throw new Error(`Unknown struct: ${type}`);
            const struct = this.structs.get(type);
            if (array.length === 0) {
                builder.addStruct(name, struct);
                return;
            }
            let arr = null;
            for (let i = 1; i < array.length; i++)
                arr = StructBuilder.StructBuilder.createArray(arr === null ? StructBuilder.StructBuilder.createStruct(struct) : arr, array[i]);
            if (arr !== null)
                builder.addArray(name, arr, array[0]);
        }
    }
    getDeclarationType(ctx) {
        if (!ctx)
            return DeclarationType.DeclarationType.Unknown;
        if (ctx.primitiveType_list() && ctx.primitiveType_list().length > 0)
            return DeclarationType.DeclarationType.Primitive;
        if (ctx.userType() !== null)
            return DeclarationType.DeclarationType.User;
        return DeclarationType.DeclarationType.Unknown;
    }
    getArrayLength(ctx) {
        if (!ctx)
            return [];
        const arr = [];
        for (const dimension of ctx.dimension_list())
            arr.push(parseInt(dimension.NUMBER().getText()));
        return arr;
    }
    getVarType(list) {
        if (!list)
            throw new Error(`No type provided`);
        const type = list.map((ctx) => ctx.getText()).join('_');
        const res = Object.values(VarType.VarType).find((value) => value === type);
        if (!res)
            throw new Error(`Unknown type: ${type}`);
        return res;
    }
    getStructs() {
        return this.structs;
    }
    static read(path$1) {
        const stream = new antlr4.CharStream(fs.readFileSync(path.resolve(path$1), 'utf-8'));
        const lexer = new SchemaLexer(stream);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new SchemaParser.default(tokens);
        const visitor = new SchemaReader();
        visitor.visitSchema(parser.schema());
        return visitor.getStructs();
    }
}

exports.SchemaReader = SchemaReader;
