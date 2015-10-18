var engine = require('../index.js')
var expect = require('chai').expect

describe('function', function() {
 it('should serialize function', function() {
  var t = function test() { return 'hello world'; } 
  
  var e = engine.stringify(t)

  expect(e).to.equal("return function test() { return 'hello world'; }")
  expect(engine.parse(e)()).to.equal('hello world')
 })

 it('should serialize array', function() {
  var t = [0,1,2]
  
  var e = engine.stringify(t)

  expect(e).to.equal("return [0,1,2]")

  expect(engine.parse(e)).to.deep.equal(t)
 })

 it('should serialize object', function() {
  var t = {foo: 'bar'}
  
  var e = engine.stringify(t)

  expect(e).to.equal("return {foo:'bar'}")

  expect(engine.parse(e)).to.deep.equal(t)
 })

 it('should serialize deep object', function() {
  var t = {foo: 'bar', bar: [0, 1, 2], foobar: {some: 'thing'}}
  
  var e = engine.stringify(t)

  expect(engine.parse(e)).to.deep.equal(t)
 })

 it('should serialize prototype', function() {
   function Test() {}

   Test.prototype.hello = function(name) {
     return `hello ${name}!`
   }

   var e = engine.stringify(Test)
   var t = engine.parse(e)
   var o = new t()

   expect(o).to.be.an.instanceof(t)
   expect(o).not.to.be.an.instanceof(Test)
   expect(o.hello('you')).to.equal('hello you!')
 })

 it('should serialize a prototype instance', function() {
  function Test() {
    this.hello = 'world' 
  }

  var t = new Test()

  var s = engine.stringify(t)
  var o = engine.parse(s)

  expect(o).to.have.property('hello', 'world')
 })

 it('should serialize an Error', function() {
  var e = new Error('Failure')

  var s = engine.stringify(e)
  var o = engine.parse(s)

  expect(e.stack).to.equal(o.stack)
  expect(e.message).to.equal(o.message)
 })

 it('should serialize a Date', function() {
  var e = new Date()

  var s = engine.stringify(e)
  var o = engine.parse(s)

  expect(e).to.deep.equal(o)
 })

 it('should run in global context', function() {
   var t = function() {
    return process 
   }

   var s = engine.stringify(t)
   var o = engine.parse(s)
   
   expect(o()).to.deep.equal(process)
 })
})
