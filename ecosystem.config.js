var WEB_CONCURRENCY = process.env.WEB_CONCURRENCY || 1 // Set by Heroku or -1 to scale to max cpu core -1
var WEB_MEMORY = process.env.WEB_MEMORY || 512    // " " "
var NODE_PATH = process.env.NODE_PATH || './src'
var NODE_ENV = process.env.NODE_ENV || 'development'
var API_URL = process.env.API_URL || 'http://localhost:3000'
var APP_DOMAIN = process.env.APP_DOMAIN || 'localhost.dev:3001'
var PAGARME_KEY = process.env.PAGARME_KEY || 'ek_test_PYsS1XrZsCCF7wynC67YEi5RW3lSCV'
var NEW_RELIC_HOME = process.env.NEW_RELIC_HOME || './src'
var NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY || ''

module.exports = {
  apps : [{
    name        : "reboo-client",
    script      : "./bin/server.js",
    instances : WEB_CONCURRENCY,
    max_memory_restart : WEB_MEMORY + 'M',
    exec_mode  : "cluster",
    env: {
      "NODE_PATH": NODE_PATH,
      "NODE_ENV": NODE_ENV,
      "API_URL": API_URL,
      "APP_DOMAIN": APP_DOMAIN,
      "PAGARME_KEY": PAGARME_KEY,
      "NEW_RELIC_HOME": NEW_RELIC_HOME,
      "NEW_RELIC_LICENSE_KEY": NEW_RELIC_LICENSE_KEY
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}
