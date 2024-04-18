/// <reference types="node" />
import { Endian } from "../enums/Endian";
import { VarType } from "../enums/VarType";
import { ArrayCollection } from "../interfaces/ArrayCollection";
import { Struct } from "../interfaces/Struct";
import { StructCollection } from "../interfaces/StructCollection";
export declare class BufferReader {
    private _buffer;
    private readonly _endian;
    constructor(buffer: Buffer, endian?: Endian);
    readNumber(type: VarType): number | null;
    readBool(type: VarType): boolean | null;
    readArray(template: ArrayCollection): unknown[];
    readStruct(template: StructCollection): Struct | null;
    private getInternalType;
}
