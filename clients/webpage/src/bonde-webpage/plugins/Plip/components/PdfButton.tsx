import React from 'react';
import EyeIcon from '../icons/EyeIcon';

interface PdfButtonProps {
  dataPdf: string
}

const PdfButton = (props: PdfButtonProps) => {
  const handleClick = (event:any) => {
    event?.preventDefault()
    const win = window.open();
    const data = encodeURI(`data:application/pdf;filename=generated.pdf;base64,${props.dataPdf}`)
    win?.document.write('<iframe src="' + data + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
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
