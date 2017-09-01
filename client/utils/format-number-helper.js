import format from 'format-number'

//
// Options
//
const numberOptions = { integerSeparator: '.', decimal: ',' }
const currencyOptions = { ...numberOptions, prefix: 'R$ ', padRight: 2, truncate: 2 }
const floatOptions = { integerSeparator: '', decimal: '.', padRight: 2 }
const integerOptions = { integerSeparator: '', truncate: 0 }

//
// Helpers
//
export const currency = format(currencyOptions)
export const number = format(numberOptions)
export const float = format(floatOptions)
export const integer = format(integerOptions)
