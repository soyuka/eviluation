'use strict';
module.exports = function ArrayType(element) {
    if(!Array.isArray(element)) {
      return null
    }

    var l = element.length
    var i = 0

    var str = this.appendReturn('[')

    for(; i < l; i++) {
      str += this._stringify(element[i])
      str += i != l - 1 ? ',' : ''
    }

    str += ']'

    return str
}
