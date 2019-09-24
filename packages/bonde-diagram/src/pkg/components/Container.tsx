import styled from '@emotion/styled'

export type ContainerProps = {
  children: any,
  color: string,
  background: string,
  onDrop(evt: any): void,
  onDragOver(evt: any): void
}

const Container = styled.div<ContainerProps>`
  height: 100%;
  background-repeat: repeat!important;
  background-color: ${p => p.background} !important;
  background-size: 50px 50px;
  display: flex;

  > * {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      ${p => p.color} 25%,
      ${p => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${p => p.color} 75%,
      ${p => p.color} 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      ${p => p.color} 25%,
      ${p => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${p => p.color} 75%,
      ${p => p.color} 76%,
      transparent 77%,
      transparent
    );

  & > .canvas > svg {
    overflow: visible!important;
  }
`

export default Container