'use strict';

module.exports = function StringType(element) {
  if(typeof element != 'string') {
    return null
  }

  return this.appendReturn(`'${element}'`)
}
