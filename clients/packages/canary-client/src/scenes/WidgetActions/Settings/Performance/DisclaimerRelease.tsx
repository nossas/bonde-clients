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
          <Text>{`Os dados abaixo correspondem à performance da sua campanha desde o dia ${firstEventTimestamp.toLocaleDateString()}, quando o BONDE lançou essa funcionalidade para tornar sua estratégia mais eficaz.`}</Text>
        </Stack>
      </Alert>
    )
    : null
  ;
}

export default DisclaimerRelease;