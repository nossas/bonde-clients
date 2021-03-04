import React from 'react';
import styled from 'styled-components';
import EditImageIcon from './EditImageIcon';

interface ImageStyledProps {
  scale?: number
}

const ImageStyled = styled.div<ImageStyledProps>`
  position: relative;
  transform: ${props => `scale(${props.scale})`};

  img {
    width: 83px;
    height: 83px;
    border-radius: 50%;

    &:focus {
      outline: none;
      border: none;
    }
  }

  svg {
    position: absolute;
    bottom: 3px;
    right: 0;
  }
`

interface ImageProps extends ImageStyledProps {
  src: string
  alt?: string
}

const Image: React.FC<ImageProps> = ({ src, alt, scale }) => (
  <ImageStyled scale={scale}>
    <img src={src} alt={alt} />
    <EditImageIcon />
  </ImageStyled>
);

Image.defaultProps = {
  scale: 1
}

export default Image;