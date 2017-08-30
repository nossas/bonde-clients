import format from 'format-number'

//
// Options
//
const numberOptions = { integerSeparator: '.', decimal: ',' }
const floatOptions = { integerSeparator: '', decimal: '.', padRight: 2 }

//
// Helpers
//
export const currency = format({ ...numberOptions, prefix: 'R$ ', padRight: 2, truncate: 2 })
export const number = format(numberOptions)
export const float = format(floatOptions)
