import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
import { editBlock } from './../reducers/blocks'

@connect(state => ({ form: state.blockForm }))
@reduxForm('blockForm')

export default class NavbarForm extends React.Component {
  static propTypes = {
    onCancelButtonClick: PropTypes.func.isRequired,
    mobilization: PropTypes.object.isRequired,
    block: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.refs.nameInput.getDOMNode().focus()
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyUp(e) {
    if (e.keyCode === 27) {
      this.submit()
    }
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.submit()
  }

  handleOverlayClick() {
    this.submit()
  }

  submit() {
    const { mobilization, block, dispatch, auth, data } = this.props

    dispatch(
      editBlock({
        mobilization_id: mobilization.id,
        id: block.id,
        block: data,
        credentials: auth.credentials
      })
    )

    this.props.onCancelButtonClick()
  }

  render() {
    const {handleChange} = this.props

    return (
      <form className='inline-block' onSubmit={::this.handleFormSubmit}>
        <input
          {...name}
          type='text'
          ref='nameInput'
          className='field-light'
        />
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z1"
          onClick={::this.handleOverlayClick}/>
      </form>
    )
  }
}
