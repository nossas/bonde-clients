import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import config from '../config'
import winston from 'winston'

const app = express()
app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false
}))
app.use(bodyParser.json())

function loadAuth(req) {
  return Promise.resolve(req.session.auth || null)
}

function logout(req) {
  return new Promise((resolve) => {
    req.session.destroy(() => {
      req.session = null
      return resolve(null)
    })
  })
}

const actions = [loadAuth, logout]

export default function api() {
  return new Promise((resolve) => {
    app.use((req, res) => {
      const matcher = req.url.split('?')[0].split('/')
      const action = matcher && actions[matcher[1]]
      if (action) {
        winston.info('API PROMISE:', matcher)
        action(req, matcher.slice(2))
          .then((result) => {
            res.json(result)
          }, (reason) => {
            if (reason && reason.redirect) {
              res.redirect(reason.redirect)
            } else {
              winston.error('API ERROR:', reason)
              res.status(reason.status || 500).json(reason)
            }
          })
      } else {
        res.status(404).end('NOT FOUND')
      }
    })
    app.listen(config.apiPort)
    resolve()
  })
}
