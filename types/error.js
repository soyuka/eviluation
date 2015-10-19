'use strict';
function EError(message, stack) {
  this.message = message 
  this.stack = stack 
}

module.exports = function ErrorType(element) {
  if(!(element instanceof Error)) {
    return null
  }

  EError.prototype = element
  EError.prototype.name = element.name

  this.num++

  var str = this._stringify(EError)

  str += `\nreturn new EError('${element.message}', \`${element.stack}\`)`

  return str
}
