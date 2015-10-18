# Eviluation

**This library uses ES6 templates - node > 4.0 is required.**

Stringify javascript objects, function or prototypes and get them back.
This can be dangerous if misused!

For example, take this prototype:

```javascript
function Test() {}

Test.prototype.hello = function(name) {
  return `hello ${name}!`
}
```

Now we can share this as a string:

```javascript
var engine = require('eviluation')

var str = engine.stringify(Test)

var SomeTest = engine.parse(str)

var t = new SomeTest()

//prints hello you!
console.log(t.hello('you'))
```

Internally this only uses `new Function(string)`, so it will run in the global context. This can obviously be harmful:

```javascript
 var t = function() {
  //do some evil things with global variables
  return process
 }

 var s = engine.stringify(t)
 var o = engine.parse(s)
 
 expect(o()).to.deep.equal(process)
```

Anyway, having an Error object stringified can be useful:

```javascript
var t = new Error('test')

var s = engine.stringify(t)

var o = engine.parse(s)

console.log(o.stack)
```

## License

>Copyright (c) 2015 Antoine Bluchet
>
>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
