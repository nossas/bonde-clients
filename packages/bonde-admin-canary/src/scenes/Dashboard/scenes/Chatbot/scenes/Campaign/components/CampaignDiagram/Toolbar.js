import React from 'react'
import PropTypes from 'prop-types'
import { Card, Flexbox2 as Flexbox, Spacing } from 'bonde-styleguide'
import { Draggable } from 'bonde-diagram/lib/diagram-pkg'

const Button = ({ data, children }) => {
  return (
    <Draggable data={data}>
      <Spacing margin={{ bottom: 5 }}>
        <Card rounded={2} style={{ cursor: 'pointer' }} padding={{ x: 30, y: 30 }}>
          <Flexbox horizontal spacing='around' align='center'>
            {children}
          </Flexbox>
        </Card>
      </Spacing>
    </Draggable>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  data: PropTypes.object
}

const Toolbar = ({ children }) => {
  return (
    <Flexbox vertical>
      {children}
    </Flexbox>
  )
}

Toolbar.propTypes = {
  children: PropTypes.any
}

Toolbar.Button = Button

export default Toolbar
