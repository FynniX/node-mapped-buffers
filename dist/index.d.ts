import { VarType } from "./enums/VarType";
import { ArrayCollection } from "./interfaces/ArrayCollection";
import { Struct } from "./interfaces/Struct";
import { StructCollection } from "./interfaces/StructCollection";
/**
 * @class
 * @name MappedBuffer
 * @description A memory mapped buffer.
 */
export declare class MappedBuffer {
    /**
     * @private
     * @description The addon instance.
     */
    private readonly _addonInstance;
    /**
     * @name _template
     * @description The template of the struct.
     */
    private readonly _template;
    /**
     * @name bufferPath
     * @description The path of the buffer.
     */
    readonly bufferPath: string;
    /**
     * @name bufferSize
     * @description The size of the buffer in bytes.
     */
    readonly bufferSize: number;
    /**
     * @constructor
     * @param bufferPath The path of the buffer.
     * @param struct The struct of the buffer.
     */
    constructor(bufferPath: string, struct: StructCollection);
    create(): void;
    open(): void;
    read(): Struct | null;
    write(data: Struct): void;
    close(): void;
    static getVarTypeSize(type: VarType): number | undefined;
    static calculateStructSize(struct: StructCollection): number;
    static calculateArraySize(arr: ArrayCollection): number;
}
