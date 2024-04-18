/// <reference types="node" />
import { Endian } from '../enums/Endian';
import { VarType } from '../enums/VarType';
import { ArrayCollection } from '../interfaces/ArrayCollection';
import { Struct } from '../interfaces/Struct';
import { StructCollection } from '../interfaces/StructCollection';
export declare class BufferWriter {
    private _buffer;
    private readonly _endian;
    constructor(endian?: Endian);
    writeNumber(type: VarType, value: number): void;
    writeBool(type: VarType, value: boolean): void;
    writeArray(template: ArrayCollection, value: unknown[]): void;
    writeStruct(template: StructCollection, value: Struct): void;
    getBuffer(): Buffer;
    private getInternalType;
}
