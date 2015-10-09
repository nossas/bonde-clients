import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { NavbarButton, NavbarForm } from './'

export default class NavbarEditionWrapper extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      isEditing: false,
      isMouseOver: false
    }
  }

  handleEditButtonClick() {
    this.setState({
      isEditing: true,
      isMouseOver: false
    })
  }

  handleCloseForm() {
    this.setState({isEditing: false})
  }

  handleMouseOver() {
    this.setState({isMouseOver: true})
  }

  handleMouseOut() {
    this.setState({isMouseOver: false})
  }

  renderEditingButtons() {
    const buttonsWrapperClassName = classnames(
      'absolute z1 right-align full-width top-0',
      { hide: this.state && !this.state.isMouseOver }
    )

    const editingButtonsStyle = {
      width: '25px',
      height: '25px',
      padding: 0,
      marginLeft: '2px'
    }

    const editingButtonsClassName = 'button white bg-darken-4 circle'

    return (
      <div className='relative'>
        <div className={buttonsWrapperClassName}>
          <button
            className={editingButtonsClassName}
            style={editingButtonsStyle}
            onClick={::this.handleEditButtonClick}>
            <i className='fa fa-pencil' />
          </button>
        </div>
      </div>
    )
  }

  blockName(block) {
    return block.name || `Bloco ${block.position}`
  }

  renderNavbarButton() {
    const { block, className } = this.props

    return (
      <div
        className='inline-block'
        onMouseOver={::this.handleMouseOver}
        onMouseOut={::this.handleMouseOut}>
        <NavbarButton
          targetId={'block-' + block.id}
          scrollableId='blocks-list'
          className={className}>
          {this.blockName(block)}
        </NavbarButton>
        {this.props.editable && this.renderEditingButtons()}
      </div>
    )
  }

  renderNavbarForm() {
    const { block } = this.props

    return (
      <NavbarForm
        {...this.props}
        defaultValue={this.blockName(block)}
        handleCloseForm={::this.handleCloseForm}
      />
    )
  }

  render() {
    return (
      this.state.isEditing ? this.renderNavbarForm() : this.renderNavbarButton()
    )
  }
}
