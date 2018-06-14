import React from 'react'
import styled from 'styled-components'
import Icon from '../../content/Icon/Icon'
import Spacing from '../../layout/Spacing/Spacing'

export const Header = styled.div`{
  width: auto;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: #000;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: flex-start;

  & > img {
    margin-right: 15px;
  }
}`

const DropdownMenu = styled.div`{
  background-color: #fff;
  padding: 20px 0;
  white-space: nowrap;
  position: absolute;
  top: 30px;
  z-index: 9;
  overflow-y: auto;
  max-height: calc(100vh - 30px - 40px);
  min-width: 100%;
}`

const DropdownMenuArrow = styled.div`
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 8px solid #fff;
  position: absolute;
  bottom: -16px;
  right: 2px;
`

const DropdownComponent = styled.div`{
  position: relative;
  display: flex;
  width: ${props => props.width ? `${props.width}px` : 'auto'};

  &  button {
    cursor: pointer;
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    background: none;
    border: none;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:active, &:focus {
      border:none;
      outline: none;
    }
  }

  & button span {
    margin: 0 10px 0 0;
    line-height: 1.15;
    letter-spacing: 0.5px;
  }
}`

const Flexbox = styled.div`{
  width: inherit;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;

  & > svg {
    margin-right: 15px;
  }
}`

const DropdownTriggerButton = styled.button.attrs({ type: 'button' })`
  height: 100%;
`

class Dropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = { show: false }
  }

  toggleMenu () {
    this.setState({ show: !this.state.show })
  }

  render () {
    const { children, label, icon, width, disabled } = this.props
    const show = this.state.show && !disabled
    return (
      <DropdownComponent width={width}>
        <React.Fragment>
          {icon && (
            <Spacing margin={{ right: 17, top: -2 }}>
              <Icon name={icon} size={16} color='#fff' />
            </Spacing>
          )}
          <DropdownTriggerButton onClick={this.toggleMenu.bind(this)}>
            <span>{label}</span>
            {show ? (
              <Icon name='angle-right' color='#fff' />
            ) : (
              <Icon name='angle-down' color='#fff' />
            )}
          </DropdownTriggerButton>
        </React.Fragment>
        {show && (<DropdownMenu>{children}</DropdownMenu>)}
        {show && (<DropdownMenuArrow />)}
      </DropdownComponent>
    )
  }
}

export default Dropdown
