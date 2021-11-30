import React from 'react';
import EyeIcon from '../icons/EyeIcon';

const PdfButton = () => {
  const handleClick = () => {
    window.open(
      `https://drive.google.com/file/d/1AkMtnR3tKCwXuUM2GcVPYj-HxtUIKJuf/view?usp=sharing`
    );
  };

  return (
    <>
        <button
        className="viewSheet"
        onClick={handleClick}>
            <EyeIcon />
          Ver ficha de assinatura
        </button>
      </>
  );
};

export default PdfButton;
