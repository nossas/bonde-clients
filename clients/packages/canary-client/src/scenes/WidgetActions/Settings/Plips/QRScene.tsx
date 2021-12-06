import React from "react";
import QrReader from "react-qr-reader";

const QRCode = () => {
  const [result, setResult] = React.useState();

  const handleScan = (data: any) => {
    if (data) setResult(data);
  }

  const handleError = (err: any) => {
    console.log(err);
  }
  
  return (
    <div>
      <h2>QR Code page</h2>
      <hr />
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{result}</p>
    </div>
  )
}

export default QRCode;