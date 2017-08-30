import format from 'format-number'

export const currency = format({
  prefix: 'R$ ',
  integerSeparator: '.',
  decimal: ',',
  padRight: 2,
  truncate: 2
})
