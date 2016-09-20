import React, { PropTypes } from 'react'
import classnames from 'classnames'

const ControlButtons = ({ submitting, submitted, dirty, formInline, valid, ...props }) => (
  <div className={classnames(
      'control-buttons',
      formInline ? 'inline-block ml1' : 'flex flex-wrap mt1'
  )}>
    <input
      type="submit"
      className={classnames(
        'btn h3 col-12 mt1 mb2 mx2 white p2 rounded',
        !valid ? 'bg-gray95' : 'bg-pagenta'
      )}
      disabled={!valid || submitting || !dirty}
      value={(submitting ? "Salvando..." : "Continuar")}
    />
    {
      submitted &&
      <div className="success-message green h4 px2 mt2">Formulário atualizado com sucesso!</div>
    }
  </div>
)

ControlButtons.propTypes = {
  submitting: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  formInline: PropTypes.bool.isRequired
}

ControlButtons.defaultProps = {
  formInline: false
}

export default ControlButtons
