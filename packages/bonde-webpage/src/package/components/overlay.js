import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const OverlayWrapper = styled.div`{
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bg};
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${props => props.hover ? 1 : 0};
}`

class Overlay extends React.Component {

  constructor (props) {
    super(props)
    this.state = { hover: false }
  }

  render () {
    const { children, background, onClick } = this.props

    return (
      <OverlayWrapper
        bg={background}
        hover={this.state.hover}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onClick={onClick}
      >
        {children}
      </OverlayWrapper>
    )
  }
}

Overlay.propTypes = {
  background: PropTypes.string,
  onClick: PropTypes.func
}

Overlay.defaultProps = {
  background: 'rgba(0,0,0,0.5)'
}

export default Overlay
