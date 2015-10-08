import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { NavbarButton, NavbarForm } from './'

export default class NavbarEditionWrapper extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    className: PropTypes.string
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      isEditing: false,
      isMouseOver: false
    }
  }

  onEditButtonClick() {
    this.setState({
      isEditing: true,
      isMouseOver: false
    })
  }

  onCancelButtonClick() {
    this.setState({isEditing: false})
  }

  onMouseOver() {
    this.setState({isMouseOver: true})
  }

  onMouseOut() {
    this.setState({isMouseOver: false})
  }

  renderEditingButtons() {
    const editingButtonsClassName = classnames(
      'absolute z4 right-align full-width',
      { hide: this.state && !this.state.isMouseOver }
    )

    return (
      <div className='relative'>
        <div className={editingButtonsClassName} style={{top: '0px'}}>
          <button
            className='button white bg-darken-4 circle'
            style={{width: '25px', height: '25px', padding: 0, margin: '2px'}}
            onClick={::this.onEditButtonClick}>
            <i className='fa fa-pencil' />
          </button>
          <button
            className='button white bg-darken-4 circle'
            style={{width: '25px', height: '25px', padding: 0, margin: '2px'}}
            onClick={::this.onEditButtonClick}>
            <i className='fa fa-eye-slash' />
          </button>
        </div>
      </div>
    )
  }

  renderNavbarButton() {
    const { block, className } = this.props

    return (
      <div className='inline-block' onMouseOver={::this.onMouseOver} onMouseOut={::this.onMouseOut}>
        <NavbarButton
          targetId={'block-' + block.id}
          scrollableId='blocks-list'
          className={className}>
          {block.name || `Bloco ${block.position}`}
        </NavbarButton>
        {this.props.editable && this.renderEditingButtons()}
      </div>
    )
  }

  renderNavbarForm() {
    const { block, mobilization, dispatch, auth } = this.props

    return (
      <NavbarForm
        formKey={String(block.id)}
        initialValues={block}
        block={block}
        mobilization={mobilization}
        dispatch = {dispatch}
        auth = {auth}
        onCancelButtonClick={::this.onCancelButtonClick}
      />
    )
  }

  render() {
    return (
      this.state.isEditing ? this.renderNavbarForm() : this.renderNavbarButton()
    )
  }
}
