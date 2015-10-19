'use strict';

module.exports = function ObjectType(element) {
  if(typeof element != 'object') {
    return null
  }

  var str = this.appendReturn('{')

  for(let i in element) {
    str += i+':'+this._stringify(element[i])+','
  }

  str = str.slice(0, -1) + '}'

  return str
}
