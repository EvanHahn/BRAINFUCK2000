BRAINFUCK 2000
==============

brainfuck for the year 2000. made for the javascript.

quick start
-----------

in the browser:

```html
<script src="brainfuck2000.js"></script>
```

in Node:

```js
var brainfuck = require('brainfuck2000')
```

and then:

```js
var program = brainfuck(',+.>,+.')
program.run('gh')
program.resultString()  // 'hi'
program.result          // [104, 105]
program.tape            // [104, 105]
```

pow pow!
