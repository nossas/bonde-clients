import React from 'react'

class Pagarme extends React.Component {
  UNSAFE_componentWillMount() {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://assets.pagar.me/js/pagarme.js'
    script.async = true
    document.body.append(script)
  }

  render() {
    return <span />
  }
}

export default Pagarme
