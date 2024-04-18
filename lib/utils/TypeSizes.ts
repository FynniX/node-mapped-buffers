import { Collection } from '../interfaces/Collection'
import { CollectionType } from '../enums/CollectionType'
import { ArrayCollection } from '../interfaces/ArrayCollection'
import { StructCollection } from '../interfaces/StructCollection'
import { VarType } from '../enums/VarType'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require('../../build/Release/node-mapped-buffer')

export const getVarTypeSize = (type: VarType): number | undefined => {
  return addon.getVarTypeSize(type)
}

export const calculateStructSize = (struct: StructCollection): number => {
  let size = 0

  for (const key in struct) {
    const varType = struct[key]

    // Regular type
    if (typeof varType === 'string') {
      size += getVarTypeSize(varType) ?? 0
    }

    // Collection type
    if (typeof varType === 'object') {
      const collection = varType as Collection

      // Struct collection
      if (collection.type === CollectionType.Struct) {
        size += calculateStructSize(collection.data as StructCollection)
      }

      // Array collection
      if (collection.type === CollectionType.Array) {
        size += calculateArraySize(collection.data as ArrayCollection)
      }
    }
  }

  return size
}

export const calculateArraySize = (arr: ArrayCollection): number => {
  let size = 0

  // Regular type
  if (typeof arr.type === 'string') {
    size += (getVarTypeSize(arr.type) ?? 0) * arr.size
  }

  // Collection type
  if (typeof arr.type === 'object') {
    const arrayType = arr.type as Collection

    // Struct collection
    if (arrayType.type === CollectionType.Struct) {
      size += calculateStructSize(arrayType.data as StructCollection) * arr.size
    }

    // Array collection
    if (arrayType.type === CollectionType.Array) {
      size += calculateArraySize(arrayType.data as ArrayCollection) * arr.size
    }
  }

  return size
}
