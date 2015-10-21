import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default class FormWidgetButton extends React.Component {
  static propTypes = {
    success: PropTypes.bool.isRequired,
    buttonText: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    mobilization: PropTypes.object.isRequired
  }

  render() {
    const {
      success,
      buttonText,
      loading,
      handleClick,
      mobilization: { body_font: bodyFont }
    } = this.props

    return (
      <div className={classnames(`${bodyFont}-body`)}>
        <button
          disabled={loading}
          className="caps button bg-darken-4 p2 full-width mt1 mb2"
          onClick={handleClick}>
          {loading ? 'Enviando...' : buttonText }
        </button>
        { success &&
          <div className="center">Sua ação foi registrada com sucesso!</div> }
      </div>
    )
  }
}
