'use strict';
module.exports = function DateType(element) {
  if(!(element instanceof Date)) {
    return null
  }

  let s = `new Date(${element.getTime()})`
  return this.num === 0 ? `return ${s}` : s
}

