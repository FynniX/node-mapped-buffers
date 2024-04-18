import { ArrayCollection } from '../interfaces/ArrayCollection';
import { StructCollection } from '../interfaces/StructCollection';
import { VarType } from '../enums/VarType';
export declare const getVarTypeSize: (type: VarType) => number | undefined;
export declare const calculateStructSize: (struct: StructCollection) => number;
export declare const calculateArraySize: (arr: ArrayCollection) => number;
