import React, { Component, PropTypes } from 'react'


class OverlayWidget extends Component {

  constructor(props, context) {
    super(props)
    this.context = context
    this.state = {
      hasMouseOver: false,
    }
  }

  handleMouseEnter(e) {
    if (e) e.preventDefault()
    this.setState({ hasMouseOver: true })
  }

  handleMouseLeave(e) {
    if (e) e.preventDefault()
    this.setState({ hasMouseOver: false })
  }

  render() {
    const { children, editable, onClick } = this.props
    /*const children = this.props.children.map(component => {
      return React.cloneElement(component, {...this.props})
    })*/
    {/*<div className={`widget ${headerFont}-header`}*/}
    return (
      <div className="widget relative"
           style={(editable ? {cursor: 'pointer'} : null)}
           onMouseEnter={::this.handleMouseEnter}
           onMouseLeave={::this.handleMouseLeave}
           onClick={onClick}>
        {children}
        {editable && this.state.hasMouseOver ?
          <div
            className="overlay absolute top-0 right-0 bottom-0 left-0 bg-darken-4 h1 bold flex flex-center"
            style={{zIndex: 9998}}>
            <div className="center full-width white">Clique para editar</div>
          </div> : null}
      </div>
    )
  }
}

OverlayWidget.propTypes = {
  editable: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

OverlayWidget.defaultProps = {
  editable: false,
}

export default OverlayWidget
