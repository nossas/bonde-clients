import React, { useState } from 'react'
import styled from 'styled-components';
import TooltipIcon from './TooltipIcon';

const TooltipStyled = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`;

const Message = styled.span`
  font-family: Nunito Sans;
  position: absolute;
  background-color: #424242;
  padding: 23px 16px;
  width: 250px;
  font-size: 13px;
  text-transform: none;
  color: #fff;
  right: -200px;
  top: 25px;
  line-height: 17.73px;
`;

type Props = {
  label?: string
  info: string | any
}

const Tooltip = ({ label, info }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <TooltipStyled>
      {label}
      <div
        style={{ position: 'relative' }}
        onMouseOver={() => setVisible(true)}
        onMouseOut={() => setVisible(false)}
      >
        <TooltipIcon />
        {visible && (
          <Message>
            {info}
          </Message>
        )}
      </div>
    </TooltipStyled>
  )
}

export default Tooltip;