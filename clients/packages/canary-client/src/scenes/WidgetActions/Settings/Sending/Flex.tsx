import styled from "styled-components"

export type FlexProps = {
  width?: string
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  spacing?: string
}

export const Flex = styled.div<FlexProps>`
  width: ${({ width = '100%' }) => width};
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  & > * + * {
    margin-left: ${({ spacing }) => spacing};
  }
`
