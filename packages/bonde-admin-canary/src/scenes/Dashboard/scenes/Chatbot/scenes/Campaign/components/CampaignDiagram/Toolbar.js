import React from 'react'
import PropTypes from 'prop-types'
import { Card, Flexbox2 as Flexbox, Spacing } from 'bonde-styleguide'
import { Draggable } from 'bonde-diagram'

export const Button = ({ kind, children }) => {
  return (
    <Spacing margin={{ right: 5 }}>
      <Draggable kind={kind}>
        <Card rounded={2} style={{ cursor: 'pointer' }} padding={{ x: 30, y: 30 }}>
          <Flexbox horizontal spacing='around' align='center'>
            {children}
          </Flexbox>
        </Card>
      </Draggable>
    </Spacing>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  kind: PropTypes.oneOf(['message', 'reply'])
}

const Toolbar = ({ children }) => {
  return (
    <Spacing margin={{ top: 10 }}>
      <Flexbox horizontal>
        {children}
      </Flexbox>
    </Spacing>
  )
}

Toolbar.propTypes = {
  children: PropTypes.any
}

export default Toolbar
