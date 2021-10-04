import React from "react";
import { Alert, ChartIcon, Text, Stack } from "bonde-components";

type Props = {
  firstEventTimestamp: Date
  widgetCreatedAt: Date
}

const DisclaimerRelease: React.FC<Props> = ({ firstEventTimestamp, widgetCreatedAt }) => {
  return firstEventTimestamp > widgetCreatedAt
    ? (
      <Alert status="success">
        <Stack direction="row" spacing={4} align="center">
          <ChartIcon />
          <Text>{`Os dados de envio de e-mail abaixo começaram a ser coletados no dia  ${firstEventTimestamp.toLocaleDateString()} para te dar mais visibilidade da performance das suas campanhas.`}</Text>
        </Stack>
      </Alert>
    )
    : null
    ;
}

export default DisclaimerRelease;
