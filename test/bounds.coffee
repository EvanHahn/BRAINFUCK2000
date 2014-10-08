brainfuck = require '..'

expect = require 'expect.js'
_ = require 'lodash'

describe 'register bounds', ->

  it 'can bound the values negatively', ->
    program = brainfuck(src: '>+>->--', minValue: -1)
    program.run()
    expect(program.tape).to.eql [0, 1, -1, -1]

  it 'can bound the values positively', ->
    program = brainfuck(src: '>->+>++', maxValue: 1)
    program.run()
    expect(program.tape).to.eql [0, -1, 1, 1]

  it 'can bound the values on both sides', ->
    program = brainfuck(src: '>->-->--->+>++>+++', minValue: -1, maxValue: 1)
    program.run()
    expect(program.tape).to.eql [0, -1, -1, -1, 1, 1, 1]

  it 'can wrap around', ->
    program = brainfuck
      src: '--->+++++++++++'
      minValue: -1
      maxValue: 10
      wrap: yes
    program.run()
    expect(program.tape).to.eql [9, -1]
