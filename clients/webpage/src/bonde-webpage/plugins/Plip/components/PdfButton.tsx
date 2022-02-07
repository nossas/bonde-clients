import React from 'react';
import { saveAs } from 'file-saver';
import EyeIcon from '../icons/EyeIcon';

/* Helper function */
const b64toBlob = (b64Data: string, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

interface PdfButtonProps {
  dataPdf: string
  fileName: string;
}

const PdfButton = (props: PdfButtonProps) => {
  const blob = b64toBlob(props.dataPdf.replace('data:application/pdf;filename=generated.pdf;base64,',''));

  return (
    <button
      onClick={() => {
        saveAs(blob, props.fileName);
      }}
    >
      <EyeIcon />
      Ver ficha de assinatura
    </button>
  );
};

export default PdfButton;
