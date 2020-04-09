import styled from 'styled-components'
import { Row } from 'bonde-components'

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  padding: 20px 60px;

  ${Row} {
    width: 100%;
  }
`

export default Content
