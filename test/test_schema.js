const SchemaReader = require('../dist/utils/SchemaReader').SchemaReader
const path = require('path')
const assert = require('assert')

assert(SchemaReader, 'The SchemaReader is undefined')

// Validate all functions
assert.doesNotThrow(() => {
  assert(SchemaReader.read, 'Read function is undefined')
}, 'Not all functions are defined')

// Test weather read returns template
assert.throws(() => SchemaReader.read(path.join(__dirname, 'wrong.map')), undefined, "Read didn't throw an exception")
assert.doesNotThrow(
  () => SchemaReader.read(path.join(__dirname, 'schema.map')),
  undefined,
  'Read did throw an exception'
)
assert.notStrictEqual(SchemaReader.read(path.join(__dirname, 'schema.map')), undefined, "Read didn't return a value")

console.log('Schema tests passed - everything looks OK!')
