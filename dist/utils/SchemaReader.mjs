import { CharStream, CommonTokenStream } from 'antlr4';
import SchemaLexer from './parser/SchemaLexer.mjs';
import SchemaParser from './parser/SchemaParser.mjs';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DeclarationType } from '../enums/DeclarationType.mjs';
import { StructBuilder } from './StructBuilder.mjs';
import { VarType } from '../enums/VarType.mjs';

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
        const builder = new StructBuilder();
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
        if (type === DeclarationType.Primitive) {
            const varType = this.getVarType(ctx.primitiveType_list());
            if (array.length === 0) {
                builder.addVariable(name, varType);
                return;
            }
            let arr = null;
            for (let i = 1; i < array.length; i++)
                arr = StructBuilder.createArray(arr === null ? varType : arr, array[i]);
            if (arr !== null)
                builder.addArray(name, arr, array[0]);
        }
        if (type === DeclarationType.User) {
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
                arr = StructBuilder.createArray(arr === null ? StructBuilder.createStruct(struct) : arr, array[i]);
            if (arr !== null)
                builder.addArray(name, arr, array[0]);
        }
    }
    getDeclarationType(ctx) {
        if (!ctx)
            return DeclarationType.Unknown;
        if (ctx.primitiveType_list() && ctx.primitiveType_list().length > 0)
            return DeclarationType.Primitive;
        if (ctx.userType() !== null)
            return DeclarationType.User;
        return DeclarationType.Unknown;
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
        const res = Object.values(VarType).find((value) => value === type);
        if (!res)
            throw new Error(`Unknown type: ${type}`);
        return res;
    }
    getStructs() {
        return this.structs;
    }
    static read(path) {
        const stream = new CharStream(readFileSync(resolve(path), 'utf-8'));
        const lexer = new SchemaLexer(stream);
        const tokens = new CommonTokenStream(lexer);
        const parser = new SchemaParser(tokens);
        const visitor = new SchemaReader();
        visitor.visitSchema(parser.schema());
        return visitor.getStructs();
    }
}

export { SchemaReader };
