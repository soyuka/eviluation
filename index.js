'use strict';
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
    let s = this._stringify(e)
    return s
  },
  _stringify: function _stringify(e) {
    var str = ''

    if(e instanceof Error) {
      function EError(message, stack) {
        this.message = message 
        this.stack = stack 
      }
      EError.prototype = e
      EError.prototype.name = e.name
      
      this.num++

      str = this._stringify(EError)

      str += `\nreturn new EError('${e.message}', \`${e.stack}\`)`

      return str
    }

    if(e instanceof Date) {
      return `return new Date(${e.getTime()})`
    }

    if(typeof e == 'function') {
      str = e.toString()

      if('prototype' in e && Object.keys(e.prototype).length > 0) {
        this.num++
        for(let i in e.prototype) {
          str += '\n'
          str += e.name + '.prototype.' + i
          str += ' = ' + this._stringify(e.prototype[i])
        }

        str += this.num === 1 ? '\nreturn '+e.name : ''

      } else {
        str = this.appendReturn(str) 
      }

      return str
    } 
    
    if(Array.isArray(e)) {
      let l = e.length
      let i = 0

      str = this.appendReturn('[')

      for(; i < l; i++) {
        str += this._stringify(e[i])
        str += i != l - 1 ? ',' : ''
      }

      str += ']'

      return str
    }

    if(typeof e == 'object') {
      str = this.appendReturn('{')

      for(let i in e) {
        str += i+':'+this._stringify(e[i])+','
      }

      str = str.slice(0, -1) + '}'

      return str
    }

    if(typeof e == 'string') {
      return this.appendReturn(`'${e}'`)
    }

    return this.appendReturn('' + e)
  },
  parse: function parse(str) {
    return new Function(str)()
  }
}
