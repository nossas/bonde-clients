import React from 'react'
import PropTypes from 'prop-types'
import WebFont from 'webfontloader'
import { DiagramProvider } from './context'

class Provider extends React.Component {
  componentDidMount () {
    WebFont.load({
      google: {
        families: ['Nunito Sans:400,600,800', 'sans-serif', 'Source Sans Pro:400,700']
      }
    })
  }

  render () {
    const diagramProps = {
      app: this.props.app,
      transferKey: this.props.transferKey,
      eventListener: this.props.eventListener
    }

    return (
      <DiagramProvider value={diagramProps}>
        <div className={this.props.className}>
          {this.props.children}
        </div>
      </DiagramProvider>
    )
  }
}

const { func, string } = PropTypes

Provider.propTypes = {
  eventListener: func,
  transferKey: string
}

Provider.defaultProps = {
  eventListener: () => {},
  transferKey: 'srd-diagram-model'
}

export default Provider