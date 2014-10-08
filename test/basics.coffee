brainfuck = require '..'

expect = require 'expect.js'
_ = require 'lodash'

describe 'program basics', ->

  it 'can run a simple program', ->
    program = brainfuck(',+.>,+.')
    program.run('gh')
    expect(program.resultString()).to.be 'hi'
    expect(program.results).to.eql [104, 105]
    expect(program.tape).to.eql [104, 105]

  it 'can run a simple program by specifying src as options', ->
    program = brainfuck(src: ',+.>,+.')
    program.run('gh')
    expect(program.resultString()).to.be 'hi'

  it 'can run "hello world"', ->
    program = brainfuck([
      '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>'
      '---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.'
    ].join(''))
    program.run()
    expect(program.resultString()).to.be 'Hello World!\n'
