import { InterfaceBuilder } from './utils/InterfaceBuilder'
import { SchemaReader } from './utils/SchemaReader'
import { StructBuilder } from './utils/StructBuilder'

export function generateFiles(path: string) {
  // Read schema
  const schema = SchemaReader.read(path)

  // Generate file
  let output = ''
  for (const [name, struct] of schema.entries()) {
    output += StructBuilder.toString(name, struct.template)
    output += new InterfaceBuilder(name, struct.template).build()
    output += `export const B${name} = new MappedBuffer<I${name}>('${struct.path}', ${name})\n`
  }

  return output
}
