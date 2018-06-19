import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Title, Spacing } from 'bonde-styleguide'

const Gadget = ({ children, title, renderFilter, WrapperComponent }) => (
  <Flexbox vertical>
    <Spacing margin={{ bottom: 15 }}>
      <Flexbox horizontal spacing='between'>
        {title
          ? <Title.H5 uppercase fontWeight='bold'>{title}</Title.H5>
          : <div />
        }
        {renderFilter && renderFilter()}
      </Flexbox>
    </Spacing>

    {WrapperComponent
      ? <WrapperComponent>{children}</WrapperComponent>
      : children
    }
  </Flexbox>
)

const { oneOfType, string, func, node } = PropTypes

Gadget.propTypes = {
  title: string,
  renderFilter: func,
  WrapperComponent: oneOfType([node, func])
}

export default Gadget
