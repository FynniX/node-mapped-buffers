const StructBuilder = require('../dist/utils/StructBuilder.js').StructBuilder
const MappedBuffer = require('../dist/index.js').MappedBuffer
const VarType = require('../dist/enums/VarType.js').VarType
const assert = require('assert')

assert(StructBuilder, 'The StructBuilder is undefined')
assert(MappedBuffer, 'The MappedBuffer is undefined')

// Create a test struct
const test3 = new StructBuilder()
  .addVariable('a', VarType.int)
  .build()

const test2 = new StructBuilder()
  .addVariable('a', VarType.int)
  .addStruct('b', test3)
  .addArray('c', VarType.float, 2)
  .build()

const test = new StructBuilder()
  .addVariable('a', VarType.bool)
  .addArray('b', StructBuilder.createStruct(test2), 5)
  .addArray('c', StructBuilder.createArray(VarType.int, 5), 3)
  .build()

// buffer should throw when no arguments are passed
assert.throws(() => new MappedBuffer(), "MappedBuffer didn't throw an exception")

const instance = new MappedBuffer('test', test)

// Validate all functions
assert.doesNotThrow(() => {
  assert(instance.create, 'Create function is undefined')
  assert(instance.open, 'Open function is undefined')
  assert(instance.read, 'Read function is undefined')
  assert(instance.write, 'Write function is undefined')
  assert(instance.close, 'Close function is undefined')
  assert(MappedBuffer.getVarTypeSize, 'GetVarTypeSize function is undefined')
  assert(MappedBuffer.calculateStructSize, 'CalculateStructSize function is undefined')
  assert(MappedBuffer.calculateArraySize, 'CalculateArraySize function is undefined')
}, 'Not all functions are defined')

// Create buffer for testing
assert.doesNotThrow(() => instance.create(), "Create did throw an exception")

// Test weather read returns struct
assert.notStrictEqual(instance.read(), undefined, "Read didn't return a value");

// Test weather write works
let data = instance.read()
data['a'] = true
assert.doesNotThrow(() => instance.write(data), "Write did throw an exception")
data = instance.read()
assert.strictEqual(data['a'], true, "Changed value is not correct");

// Test weather close works
assert.doesNotThrow(() => instance.close(), "Close did throw an exception")

console.log('Tests passed - everything looks OK!')
