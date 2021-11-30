import React from 'react';
import EyeIcon from '../icons/EyeIcon';

interface PdfButtonProps {
  dataPdf: string
}

const PdfButton = (props: PdfButtonProps) => {
  const handleClick = (event:any) => {
    event?.preventDefault()
    window.open(encodeURI(props.dataPdf)); 
  };

  return (
    <>
        <button
        onClick={handleClick}>
            <EyeIcon />
          Ver ficha de assinatura
        </button>
      </>
  );
};

export default PdfButton;
