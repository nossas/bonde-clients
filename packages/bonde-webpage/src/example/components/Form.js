import React from 'react'

export default class extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (nextProps) {
    const shouldRefreshValues = (
      (!this.props.initialValues && nextProps.initialValues)
      || (this.props.initialValues && this.props.initialValues !== nextProps.initialValues)
    )
    if (shouldRefreshValues) {
      this.setState(nextProps.initialValues)
    }
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.submit(this.state)
  }

  clearForm () {
    this.setState({ name: undefined, id: undefined })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type='hidden'
          name='id'
          onChange={this.onChange.bind(this)}
          value={this.state.id || undefined}
        />
        <div>
          <label htmlFor='nameId'>Nome</label>
          <input
            type='text'
            id='nameId'
            name='name'
            placeholder='Nome da sua mobilização'
            onChange={this.onChange.bind(this)}
            value={this.state.name || ''}
          />
          <button type='submit'>Salvar</button>
          <button type='button' onClick={this.clearForm.bind(this)}>Limpar</button>
        </div>
      </form>
    )
  }
}
