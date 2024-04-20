import { StructCollection } from '../interfaces/StructCollection';
export declare class SchemaReader {
    private structs;
    private visitSchema;
    private visitStruct;
    private visitType;
    private getDeclarationType;
    private getArrayLength;
    private getVarType;
    getStructs(): Map<string, StructCollection>;
    static read(path: string): Map<string, StructCollection>;
}
