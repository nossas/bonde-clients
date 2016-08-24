import React, { Component, PropTypes } from 'react'


class FormRedux extends Component {

  constructor(props) {
    super(props)
    this.state = { submitted: false }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.submitting && !nextProps.submitting && !nextProps.submitFailed) {
      this.setState({ submitted: true })
    }
  }

  render() {
    const { children, onSubmit, handleSubmit, submitting, ...props } = this.props
    const { submitted } = this.state

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}
        <div className="flex flex-wrap mt1">
          <button className="caps button bg-darken-3 h3 mr2">Cancelar</button>
          <input type="submit" className="caps button bg-aqua h3" value={(submitting ? "Salvando..." : "Salvar")} />
          {submitted && <div className="green h4 px2 mt2">Formulário atualizado com sucesso!</div>}
        </div>
      </form>
    )
  }
}

FormRedux.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // redux-form props
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
}

FormRedux.defaultProps = {
  submitting: false,
}

export default FormRedux
