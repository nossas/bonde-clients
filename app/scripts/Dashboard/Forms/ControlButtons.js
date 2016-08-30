import React, { PropTypes } from 'react'
import classnames from 'classnames'

const ControlButtons = ({ submitting, submitted, dirty, showCancel, formInline }) => (
  <div className={classnames(
      'control-buttons',
      formInline ? 'inline-block ml1' : 'flex flex-wrap mt1'
  )}>
    {
      showCancel &&
      <button className="caps button bg-darken-3 h3 mr2">Cancelar</button>
    }
    <input
      type="submit"
      className="caps button bg-aqua h3"
      disabled={submitting || !dirty}
      value={(submitting ? "Salvando..." : "Salvar")}
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
  showCancel: PropTypes.bool.isRequired,
  formInline: PropTypes.bool.isRequired
}

ControlButtons.defaultProps = {
  showCancel: true,
  formInline: false
}

export default ControlButtons
