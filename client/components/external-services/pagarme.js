import React, { Component } from 'react'

class Pagarme extends Component {
  componentWillMount () {
    if (require('exenv').canUseDOM) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://assets.pagar.me/js/pagarme.min.js'
      document.body.appendChild(script)
    }
  }

  render () {
    return <span />
  }
}

export default Pagarme
