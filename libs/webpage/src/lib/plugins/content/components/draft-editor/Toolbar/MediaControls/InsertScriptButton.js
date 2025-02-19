import PropTypes from 'prop-types'
import React, { Component } from 'react'

class InsertScriptButton extends Component {
  constructor (props) {
    super(props)
    this.state = { showInputDialog: false, script: '' }
  }

  getTagName (script) {
    if (script.startsWith('<iframe')) {
      return 'iframe'
    } else if (script.startsWith('<script')) {
      return 'script'
    }
    throw new Error('Sorry, script name not permitted')
  }

  handleInsertScript () {
    const { handleInsertScript } = this.props
    const { script } = this.state

    handleInsertScript(this.getTagName(script), script)
    this.setState({ script: '', showInputDialog: false })
  }

  render () {
    const { buttonClassName, popoverClassName } = this.props

    return (
      <div>
        <button
          className={buttonClassName}
          onClick={e => this.setState({ showInputDialog: !this.state.showInputDialog })}
        >
          <i className='fa fa-code' />
        </button>
        {!this.state.showInputDialog ? null : (
          <div className={popoverClassName}>
            <input
              type='text'
              value={this.state.script}
              onChange={e => this.setState({ script: e.target.value })}
            />
            <button
              className='btn btn-outline white mx1'
              onClick={this.handleInsertScript.bind(this)}
            >
              <i className='fa fa-check' />
            </button>
          </div>
        )}
      </div>
    )
  }
}

InsertScriptButton.propTypes = {
  buttonClassName: PropTypes.string,
  popoverClassName: PropTypes.string,
  handleInsertScript: PropTypes.func.isRequired
}

export default InsertScriptButton
