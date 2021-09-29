import React from "react";
import { useQuery, gql } from "bonde-core-tools";
import { Alert, ChartIcon, Text, Stack } from "bonde-components";
import { Widget } from "../../FetchWidgets";

type Props = {
  widget: Widget
}

const ACTIVITY_FEED_TIMESTAMP_GQL = gql`
  query {
    activity_feed_timestamp {
      min_timestamp
      max_timestamp
    }
  }
`;

const DisclaimerRelease: React.FC<Props> = ({ widget }) => {
  const { data, loading, error } = useQuery(ACTIVITY_FEED_TIMESTAMP_GQL);

  if (loading) return null;
  if (error) return <span>Failed</span>;

  const minTimestamp = new Date(data.activity_feed_timestamp.min_timestamp * 1000);
  const createAt = new Date(widget.created_at);

  return minTimestamp > createAt ? (
    <Alert status="success">
      <Stack direction="row" spacing={4} align="center">
        <ChartIcon />
        <Text>{`Os dados abaixo correspondem à performance da sua campanha desde o dia ${minTimestamp.toLocaleDateString()}, quando o BONDE lançou essa funcionalidade para tornar sua estratégia mais eficaz.`}</Text>
      </Stack>
    </Alert>
  ) : null;
}

export default DisclaimerRelease;