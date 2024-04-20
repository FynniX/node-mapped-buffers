const StructBuilder = require('../dist/utils/StructBuilder').StructBuilder
const SchemaReader = require('../dist/utils/SchemaReader').SchemaReader
const InterfaceBuilder = require('../dist/utils/InterfaceBuilder.js').InterfaceBuilder
const path = require('path')
const assert = require('assert')

assert(StructBuilder, 'The StructBuilder is undefined')
assert(SchemaReader, 'The SchemaReader is undefined')
assert(InterfaceBuilder, 'The InterfaceBuilder is undefined')

// Validate all functions
assert.doesNotThrow(() => {
  assert(SchemaReader.read, 'Read function is undefined')
}, 'Not all functions are defined')

// Test weather read returns template
assert.throws(() => SchemaReader.read(path.join(__dirname, 'wrong.map')), undefined, "Read didn't throw an exception")

// Test weather read throws
assert.doesNotThrow(
  () => SchemaReader.read(path.join(__dirname, 'schema.map')),
  undefined,
  'Read did throw an exception'
)

// Test weather read returns struct
assert.notStrictEqual(SchemaReader.read(path.join(__dirname, 'schema.map')), undefined, "Read didn't return a value")

const schema = SchemaReader.read(path.join(__dirname, 'schema.map'))
for (const [name, struct] of schema.entries()) {
  console.log(name, struct.path)
  console.log(StructBuilder.toString(name, struct.template))
  // Test weather interface builder works
  const interfaceBuilder = new InterfaceBuilder(name, struct.template)
  console.log(interfaceBuilder.build())
  console.log(`export const B${name} = new MappedBuffer<I${name}>('${struct.path}', ${name})`)
}

console.log('Schema tests passed - everything looks OK!')
