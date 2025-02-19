
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./bonde-components.cjs.production.min.js')
} else {
  module.exports = require('./bonde-components.cjs.development.js')
}
