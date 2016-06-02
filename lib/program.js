var commands = require('./commands')

function Program (options) {
  if (options === undefined) {
    options = { src: '' }
  } else if (typeof options === 'string') {
    options = { src: options }
  }
  this.minValue = options.minValue === undefined ? -0xfffffff : options.minValue
  this.maxValue = options.maxValue === undefined ? 0xfffffff : options.maxValue
  this.wrap = options.wrap || false
  this.src = options.src
  this.reset()
}

Program.prototype.reset = function () {
  this.tape = [0]
  this.tapeIndex = 0
  this.srcIndex = 0
  this.input = []
  this.results = []
  this.finished = false
  this.errors = []
  this.instructionsRun = 0
}

Program.prototype.step = function step () {
  if (this.finished) { return }

  var command = commands[this.src[this.srcIndex]]
  if (command) {
    command(this)
    this.instructionsRun++
  }
  this.srcIndex++
  if (this.errors.length || (this.srcIndex >= this.src.length)) {
    this.finished = true
  }
}

Program.prototype.run = function (input) {
  this.addInput(input)
  while (!this.finished) { this.step() }
  return this.resultString()
}

Program.prototype.addInput = function (toAdd) {
  if (Array.isArray(toAdd)) {
    this.input = this.input.concat(toAdd)
  } else if (typeof toAdd === 'number') {
    this.input.push(toAdd)
  } else if (typeof toAdd === 'string') {
    for (var i = 0, len = toAdd.length; i < len; i++) {
      this.input.push(toAdd.charCodeAt(i))
    }
  }
}

Program.prototype.resultString = function () {
  return String.fromCharCode.apply(String, this.results)
}

Program.prototype.flushResults = function () {
  var result = this.results
  this.results = []
  return result
}

module.exports = Program
