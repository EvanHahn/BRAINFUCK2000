var brainfuck = require('..')
var assert = require('assert')

describe('register bounds', function () {
  it('can bound the values negatively', function () {
    var program = brainfuck({
      src: '>+>->--',
      minValue: -1
    })
    program.run()

    assert.deepEqual(program.tape, [0, 1, -1, -1])
  })

  it('can bound the values positively', function () {
    var program = brainfuck({
      src: '>->+>++',
      maxValue: 1
    })
    program.run()

    assert.deepEqual(program.tape, [0, -1, 1, 1])
  })

  it('can bound the values on both sides', function () {
    var program = brainfuck({
      src: '>->-->--->+>++>+++',
      minValue: -1,
      maxValue: 1
    })
    program.run()

    assert.deepEqual(program.tape, [0, -1, -1, -1, 1, 1, 1])
  })

  it('can wrap around', function () {
    var program = brainfuck({
      src: '--->+++++++++++',
      minValue: -1,
      maxValue: 10,
      wrap: true
    })
    program.run()

    assert.deepEqual(program.tape, [9, -1])
  })
})
