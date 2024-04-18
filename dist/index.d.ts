import { Struct } from './interfaces/Struct';
import { StructCollection } from './interfaces/StructCollection';
export declare class MappedBuffer<T> {
    private readonly _addonInstance;
    private readonly _template;
    readonly bufferPath: string;
    readonly bufferSize: number;
    constructor(bufferPath: string, struct: StructCollection);
    create(): void;
    open(): void;
    read(): T | null;
    write(data: Struct): void;
    close(): void;
}
