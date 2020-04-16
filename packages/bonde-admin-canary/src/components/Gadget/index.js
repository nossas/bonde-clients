import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;

  @media only screen and (max-width: 768px) {
    h5 {
      font-size: 20px;
    }
  }
`

const GadgetTitle = ({ children }) => (
  <Title.H5 uppercase fontWeight='bold'>
    {children}
  </Title.H5>
)

GadgetTitle.propTypes = {
  children: PropTypes.node
}

const Gadget = ({ children, title, renderFilter, WrapperComponent }) => (
  <Flexbox vertical>
    <Header>
      {title
        ? <GadgetTitle>{title}</GadgetTitle>
        : <div />
      }
      {renderFilter && renderFilter()}
    </Header>

    {WrapperComponent
      ? <WrapperComponent>{children}</WrapperComponent>
      : children
    }
  </Flexbox>
)

Gadget.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  renderFilter: PropTypes.func,
  WrapperComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

Gadget.Title = GadgetTitle

export default Gadget
