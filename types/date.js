'use strict';
module.exports = function DateType(element) {
  if(!(element instanceof Date)) {
    return null
  }

  return `return new Date(${element.getTime()})`
}

