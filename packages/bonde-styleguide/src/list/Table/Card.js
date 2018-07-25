import styled from 'styled-components'

const Card = styled.div`{
  position: relative;
  border-radius: 1px;
  background-color: #ffffff;
  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, 0.04);
  width: 100%;
  display: block;
  ${props => props.height && `height: ${props.height};`}

}`

Card.displayName = 'Card'

export default Card
