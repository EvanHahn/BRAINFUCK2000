var brainfuck = require('..')
var expect = require('expect.js')

describe('program basics', function () {
  it('can run a simple program', function () {
    var program = brainfuck(',+.>,+.')
    program.run('gh')

    expect(program.resultString()).to.be('hi')
    expect(program.results).to.eql([104, 105])
    expect(program.tape).to.eql([104, 105])
    expect(program.instructionsRun).to.eql(7)
  })

  it('can run a simple program by specifying src as options', function () {
    var program = brainfuck({
      src: ',+.>,+.'
    })

    program.run('gh')
    expect(program.resultString()).to.be('hi')
  })

  it('can run "hello world"', function () {
    var program = brainfuck(['++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>', '---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.'].join(''))
    program.run()

    expect(program.resultString()).to.be('Hello World!\n')
    expect(program.instructionsRun).to.eql(986)
  })
})
