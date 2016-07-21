'use strict';
var types = require('./types')

module.exports = {
  num: 0,
  appendReturn: function(str) {
    if(this.num === 0) {
      this.num++
      return 'return ' + str
    }

    return str
  },
  stringify: function stringify(e) {
    this.num = 0

    return this._stringify(e)
  },
  _stringify: function _stringify(e) {
    var t = 0
    var l = types.length

    for(;t<l;t++) {
      let result = types[t].bind(this)(e)
      if(result !== null) {
        return result
      }
    }

    return this.appendReturn('' + e)
  },
  parse: function parse(str) {
    return new Function(str)()
  }
}
