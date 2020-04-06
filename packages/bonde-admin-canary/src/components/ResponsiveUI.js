import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 1.25rem 3rem;

  @media only screen and (max-width: 768px) {
    padding: 1.25rem 1.125rem;

    .hide-xs {
      display: none;
    }
  }
`

const getFlexBasis = ({ xs, sm }) => {
  const isMobile = window.innerWidth <= 768
  const value = isMobile ? sm : xs

  switch (value) {
    case 12:
      return 'flex-basis: 100%;'
    case 6:
      return 'flex-basis: 50%;'
    case 3:
      return 'flex-basis: 25%;'
    default:
      break
  }
}

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 0 1rem;

  ${props => getFlexBasis(props)}
`

export default { Row, Col }
