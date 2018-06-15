import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Title, Spacing } from 'bonde-styleguide'

const Gadget = ({ children, title, renderFilter, WrapperComponent }) => (
  <Flexbox vertical>
    <Spacing margin={{ bottom: 16 }}>
      <Flexbox horizontal spacing='between'>
        {title ? <Title.H4 uppercase>{title}</Title.H4> : <div />}
        {renderFilter && renderFilter()}
      </Flexbox>
    </Spacing>

    {WrapperComponent
      ? <WrapperComponent>{children}</WrapperComponent>
      : children
    }
  </Flexbox>
)

Gadget.propTypes = {
  title: PropTypes.string,
  renderFilter: PropTypes.func,
  WrapperComponent: PropTypes.node
}

export default Gadget
