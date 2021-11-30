import React from 'react';
import EyeIcon from '../icons/EyeIcon';
import { WrapButton, IconWrapper} from './styles';

const PdfButton = () => {
  const handleClick = () => {
    window.open(
      `https://drive.google.com/file/d/1AkMtnR3tKCwXuUM2GcVPYj-HxtUIKJuf/view?usp=sharing`
    );
  };

  return (
    <>
      <WrapButton>
        <button
        onClick={handleClick}
        style={{
          backgroundColor: '#EE0090', borderRadius:'0.2rem', border:'1px solid #000000', height:'4.375rem', maxWidth:'22.75rem', color:'#FFFFFF', fontFamily: 'nunito sans', textTransform: 'uppercase'}}>
          <IconWrapper>
            <EyeIcon />
          </IconWrapper>
          Ver ficha de assinatura
        </button>
      </WrapButton>
      </>
  );
};

export default PdfButton;
