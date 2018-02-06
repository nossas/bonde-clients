import React from 'react'
import styled from 'styled-components'
import { AngleDown, AngleRight } from '../Icon'

export const Item = styled.a`{
  width: auto;
  display: block;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 1.54;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  text-decoration: none;
  padding: 10px 0;
}`

const DropdownMenu = styled.div`{
  background-color: #fff;
  padding: 20px 25px;
  margin-top: 15px;
  width: auto;
  position: absolute;
 
  &::before {
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 8px solid #fff;
    position: absolute;
    top: -8px;
    right: 8px;
  }
}`

const Dropdown = styled.div`{
  position: relative;
  
  &  > button {
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:active, &:focus {
      border:none;
      outline: none;
    }
  }

  & > button span {
    margin: 0 10px 0 0;
    line-height: 1.15;
    letter-spacing: 0.5px;
  }
}`



export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { show: false }
  }

  toggleMenu () {
    this.setState({ show: !this.state.show })
  }

  render () {
    const { children, label } = this.props
    const { show } = this.state
    return (
      <Dropdown>
        <button type='button' onClick={this.toggleMenu.bind(this)}>
          <span>{this.props.label}</span>
          {show ? <AngleRight color='#fff' /> : <AngleDown color='#fff' />}
        </button>
        {show && (<DropdownMenu>{children}</DropdownMenu>)}
      </Dropdown>
    )
  }
}
