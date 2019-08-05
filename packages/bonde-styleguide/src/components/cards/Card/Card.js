import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../../content/Text/Text'

const CardBox = styled.div`
  width: 100%;
  border-radius: 1px;
  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, .04);
  position: relative;

  background-color: ${props => props.bgColor || '#fff'};
  min-height: ${props => props.minHeight};
  max-height: ${props => props.maxHeight};

  display: flex;
  flex-direction: column;
  ${props => props.middle && `justify-content: center;`}
  ${props => props.bottom && `justify-content: flex-end;`}
  ${props => props.onClick && `cursor: pointer;`}

  ${props => props.hasFooter && `
    padding-bottom: 46px;
  `}
  ${Text} > {
    color: #4a4a4a;
  }
`

const CardTitle = ({ children }) => (
  <Text
    uppercase
    fontSize={13}
    lineHeight={1.15}
    color='#4a4a4a'
    fontWeight='bold'
    margin='16px'
  >
    {children}
  </Text>
)

const CardFooter = styled.div`
  background-color: #FFFFFF;
  border-top: 1px solid #EFEFEF;
  width: 100%;
  height: 46px;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 26px;
  display: flex;
  flex-direction: row;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
`

CardFooter.defaultProps = {
  align: 'center',
  justify: 'flex-end',
}

const NoTitle = styled.div`
  height: 46px;
`

/**
 *  The only true card.
 */
const Card = styled(({
  children,
  className,
  title,
  footerProps,
  Footer,
  ...boxProps
}) => (
  <div className={className}>
    {!title ?
      <NoTitle /> :
      <CardTitle>{title}</CardTitle>
    }

    <CardBox {...boxProps} hasFooter={!!Footer}>
      {children}
      {Footer && (
        <CardFooter {...footerProps}>
          <Footer />
        </CardFooter>
      )}
    </CardBox>
  </div>
))`
  display: flex;
  flex-direction: column;
`

const { oneOfType, oneOf, number, node, func, shape } = PropTypes

Card.propTypes = {
  minHeight: number,
  maxHeight: number,
  Footer: oneOfType([node, func]),
  footerProps: shape({
    align: oneOf(['flex-start', 'center', 'flex-end']),
    justify: oneOf(['flex-start', 'center', 'flex-end', 'space-between']),
  }),
}

Card.displayName = 'Card'

/** @component */
export default Card
