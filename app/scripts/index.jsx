import React from 'react'

var Root = require('./Root.jsx')
import HashHistory from 'react-router/lib/HashHistory'

const history = new HashHistory()

React.render(<Root history={history} />, document.body)
