import React from 'react'

// CSS
import '../styles/main.scss'

var Root = require('./Root.jsx')
import HashHistory from 'react-router/lib/HashHistory'

const history = new HashHistory()

React.render(<Root history={history} />, document.body)
