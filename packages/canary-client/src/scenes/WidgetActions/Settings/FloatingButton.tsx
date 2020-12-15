import React from 'react';
import { Button } from 'bonde-components';
import { css } from 'styled-components/macro';

const FloatingButton = ({ children, ...props }: any) =>
  <div
    css={css`
      position: absolute;
      top: -170px;
      right: 0;
      width: 150px;
    `}
  >
    <Button {...props}>
      {children}
    </Button>
  </div>
;

export default FloatingButton;