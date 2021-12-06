import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Flex, Text, ArrowLeftIcon, IconButton, Stack } from "bonde-components";
import styled from "@emotion/styled";
import QRCodeIcon from "./QRCodeIcon";

const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .qr-code-reader > section > div {
    box-shadow: none;
  }
`

const QRCode = () => {
  const [result, setResult] = useState();
  console.log("result", result);

  const handleScan = (data: any) => {
    if (data) setResult(data);
  }

  const handleError = (err: any) => {
    console.log(err);
  }
  
  return (
    <Styles>
      <Flex align="center" justify="space-between" mb={4}>
        <IconButton
          icon={<ArrowLeftIcon />}
          variant="ghost"
          colorScheme="gray"
          onClick={() => console.log("click")}
        />
        <Text textTransform="uppercase">Atualizar dados</Text>
      </Flex>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        className="qr-code-reader"
      />
      <Stack bg="white" px={8} py={4} align="center" spacing={4}>
        <QRCodeIcon />
        <Text textAlign="center">Aproxime sua câmera do QR CODE na ficha para atualizar os dados ou <strong>digite manualmente</strong>.</Text>
      </Stack>
    </Styles>
  )
}

export default QRCode;