var commands = {}

commands['>'] = function (program) {
  program.tapeIndex += 1
  while (program.tape.length <= program.tapeIndex) {
    program.tape.push(0)
  }
}

commands['<'] = function (program) {
  if (program.tapeIndex === 0) {
    var error = new RangeError('Leaving tape bounds at ' + program.srcIndex)
    program.errors.push(error)
  } else {
    program.tapeIndex -= 1
  }
}

commands['+'] = function (program) {
  if (program.tape[program.tapeIndex] < program.maxValue) {
    program.tape[program.tapeIndex]++
  } else if (program.wrap) {
    program.tape[program.tapeIndex] = program.minValue
  }
}

commands['-'] = function (program) {
  if (program.tape[program.tapeIndex] > program.minValue) {
    program.tape[program.tapeIndex]--
  } else if (program.wrap) {
    program.tape[program.tapeIndex] = program.maxValue
  }
}

commands['.'] = function (program) {
  program.results.push(program.tape[program.tapeIndex])
}

commands[','] = function (program) {
  program.tape[program.tapeIndex] = program.input.shift()
}

commands['['] = function (program) {
  if (program.tape[program.tapeIndex] === 0) {
    var depth = 1
    while (depth > 0) {
      program.srcIndex++

      if (program.src[program.srcIndex] === '[') {
        depth++
      } else if (program.src[program.srcIndex] === ']') {
        depth--
      }

      if (program.srcIndex >= program.src.length) {
        var error = new SyntaxError('Mismatched loops')
        program.errors.push(error)
        return
      }
    }
  }
}

commands[']'] = function (program) {
  for (var depth = 1; depth > 0;) {
    program.srcIndex -= 1

    if (program.src[program.srcIndex] === '[') {
      depth--
    } else if (program.src[program.srcIndex] === ']') {
      depth++
    }

    if (program.srcIndex < 0) {
      var error = new SyntaxError('Mismatched loops')
      program.errors.push(error)
      break
    }
  }

  program.srcIndex -= 1
}

module.exports = commands
