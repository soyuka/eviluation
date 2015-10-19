'use strict';

module.exports = function FunctionType(element) {
    if(typeof element != 'function') {
      return null
    }

    var str = element.toString()

    if('prototype' in element && Object.keys(element.prototype).length > 0) {
      this.num++
      for(let i in element.prototype) {
        str += element.name + '.prototype.' + i
        str += '=' + this._stringify(element.prototype[i])
      }

      str += this.num === 1 ? ';return '+element.name : ''
    } else {
      str = this.appendReturn(str) 
    }

    return str
}
