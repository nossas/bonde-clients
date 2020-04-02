import React from 'react'
import styled from 'styled-components'
import Icon from '../../../content/Icon/Icon'
import Spacing from '../../../layout/Spacing/Spacing'

const DropdownInput = styled(({ className, placeholder, selectable, selected, open }) => {
  let value
  if (selectable) {
    value = typeof selected === 'string'
      ? selected : typeof selected === 'undefined'
      ? placeholder : selected.label
  } else {
    value = placeholder
  }
  return (
    <div className={className}>
      {value}
      <Spacing padding={{ x: 10, y: 0 }}>
        <Icon name={!open ? 'angle-down' : 'angle-right'} color='#fff' />
      </Spacing>
    </div>
  )
})`
  display: flex;
  flex-direction: row;
  color: #fff;
`

export default DropdownInput