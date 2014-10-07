var _ = require('lodash');

function Program(options) {
  if (options === undefined) {
    options = { src: '' };
  } else if (_.isString(options)) {
    options = { src: options };
  }
  this.src = options.src;
  this.reset();
}

Program.prototype.reset = function() {
  this.tape = [0];
  this.tapeIndex = 0;
  this.srcIndex = 0;
  this.input = [];
  this.results = [];
  this.finished = false;
  this.errors = [];
};

Program.prototype.step = function step() {
  if (this.finished) { return; }
  this.runCommand(this.src[this.srcIndex]);
  this.srcIndex ++;
  if (this.errors.length || (this.srcIndex >= this.src.length)) {
    this.finished = true;
  }
};

Program.prototype.run = function(input) {
  this.addInput(input);
  while (!this.finished) { this.step(); }
  return this.resultString();
};

Program.prototype.runCommand = function(character) {
  var error, depth;
  if (character === '>') {
    this.tapeIndex += 1;
    while (this.tape.length <= this.tapeIndex) {
      this.tape.push(0);
    }
  }
  else if (character == '<') {
    if (this.tapeIndex === 0) {
      error = new RangeError('Leaving tape bounds at ' + this.srcIndex);
      this.errors.push(error);
    } else {
      this.tapeIndex -= 1;
    }
  }
  else if (character == '+') {
    this.tape[this.tapeIndex] ++;
  }
  else if (character == '-') {
    this.tape[this.tapeIndex] --;
  }
  else if (character == '.') {
    this.results.push(this.tape[this.tapeIndex]);
  }
  else if (character == ',') {
    this.tape[this.tapeIndex] = this.input.shift();
  }
  else if (character == '[') {
    if (this.tape[this.tapeIndex] === 0) {
      depth = 1;
      while (depth > 0) {
        this.srcIndex ++;
        if (this.src[this.srcIndex] == '[') { depth ++; }
        else if (this.src[this.srcIndex] == ']') { depth --; }
        if (this.srcIndex >= this.src.length) {
          error = new SyntaxError('Mismatched loops');
          this.errors.push(error);
          break;
        }
      }
    }
  }
  else if (character == ']') {
    depth = 1;
    while (depth > 0) {
      this.srcIndex -= 1;
      if (this.src[this.srcIndex] == '[') { depth --; }
      else if (this.src[this.srcIndex] == ']') { depth ++; }
    }
    this.srcIndex -= 1;
  }
};

Program.prototype.addInput = function(toAdd) {
  if (_.isArray(toAdd)) {
    this.input = this.input.concat(toAdd);
  } else if (_.isNumber(toAdd)) {
    this.input.push(toAdd);
  } else if (_.isString(toAdd)) {
    for (var i = 0, len = toAdd.length; i < len; i ++) {
      this.input.push(toAdd.charCodeAt(i));
    }
  }
};

Program.prototype.resultString = function() {
  return String.fromCharCode.apply(String, this.results);
};

module.exports = Program;
