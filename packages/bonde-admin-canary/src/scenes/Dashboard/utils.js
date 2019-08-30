const snakeCase = (key) => {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase()
}

const camelCase = (key) => {
  const regex = /(_\w)/g
  const matches = regex[Symbol.matchAll](key)
  Array.from(matches, x => x[0]).forEach((m) => {
    const value = m[1].toUpperCase()
    key = key.replace(m, value)
  })
  return key
}

/**
 ** Reference: https://github.com/travelperk/case-converter/blob/master/src/index.js
 ** deeply converts keys of an object from one case to another
 ** @param {object} object to convert
 ** @param {function} function to convert key.
 ** @return converted object
 **/
const convertCase = (oldObject, converterFunction) => {
  let newObject

  if (!oldObject || typeof oldObject !== 'object' || !Object.keys(oldObject).length) {
    return oldObject
  }

  if (Array.isArray(oldObject)) {
    newObject = oldObject.map(element =>
      convertCase(element, converterFunction)
    )
  } else {
    newObject = {}
    Object.keys(oldObject).forEach(oldKey => {
      const newKey = converterFunction(oldKey)
      newObject[newKey] = convertCase(oldObject[oldKey], converterFunction)
    })
  }
  return newObject
}

export const toSnakeCase = obj => convertCase(obj, snakeCase)

export const toCamelCase = obj => convertCase(obj, camelCase)
