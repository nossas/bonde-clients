import styled from 'styled-components'
import { PortDynamicStyle } from '../BaseUI/Port'

const QuickReply = styled.div`
	position: relative;
	width: 100%;
  color: #1e88e5;
  padding: 10px 24px;
  font-size: 16px;
  text-align: center;
  margin-bottom: 5px;
  border: 1px solid #1e88e5;
  border-radius: 50px;

	.port {
		${PortDynamicStyle}
	}
`

export default QuickReply