import React from "react";
import QrReader from "react-qr-reader";
import { ArrowLeftIcon } from "bonde-components/icons";
import { Flex, Text, IconButton, Stack } from "bonde-components/chakra";
import styled from "@emotion/styled";

import QRCodeIcon from "./QRCodeIcon";
import QRForm from "./QRForm";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import type { Widget } from "../../FetchWidgets";
import useQueryParams from "./useQueryParams";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .qr-code-reader > section > div {
    box-shadow: none;
  }
`

interface Properties {
  widget: Widget
}

const QRScene: React.FC<Properties> = ({ widget }) => {
  const location = useLocation()
  const history = useHistory();
  const match = useRouteMatch();
  const urlParams = useQueryParams();

  const handleScan = (data: any) => {
    if (data) history.push(location.pathname + `/${data}?count=${urlParams.get('count')}`);
  }

  const handleError = (err: any) => {
    console.log(err);
  }

  return (
    <Styles>
      <Flex align="center" justify="space-between" mb={4}>
        <Flex align="center">
          <IconButton
            aria-label="Go back button"
            icon={<ArrowLeftIcon />}
            variant="ghost"
            colorScheme="gray"
            onClick={history.goBack}
          />
          <Text
            fontWeight="900"
            color="black"
            textTransform="uppercase"
            style={{ fontSize: "13px" }}>
            voltar
          </Text>
        </Flex>
      </Flex>
      <Route exact path={match.path}>
        <>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
            className="qr-code-reader"
          />
          <Stack bg="white" px={8} py={4} align="center" spacing={4}>
            <QRCodeIcon />
            <Text textAlign="center">Aproxime sua câmera do QR CODE na ficha para atualizar os dados.</Text>
          </Stack>
        </>
      </Route>
      <Route exact path={match.path + '/:code'}>
        <QRForm widget={widget} />
      </Route>
    </Styles>
  );
}

export default QRScene;
