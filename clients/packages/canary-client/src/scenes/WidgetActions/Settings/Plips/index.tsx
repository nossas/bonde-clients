import React from "react";
import { Heading, Stack, Text } from "bonde-components";
import { useQuery, gql } from "bonde-core-tools";
import type { Widget } from "../../FetchWidgets";

const PLIP_QUERY = gql`
  query ($widget_id: Int!) {
    plips(where: { widget_id: { _eq: $widget_id } }) {
      id
      widget_id
      form_data
      pdf_data
      unique_identifier
    }
  }
`;

interface Properties {
  widget: Widget
}

interface Plip {
  id: number;
  widget_id: number;
  form_data: any;
  pdf_data: string;
  unique_identifier: string;
}

const PlipsHomeScene: React.FC<Properties> = ({ widget }) => {
  const { data, loading, error } = useQuery(PLIP_QUERY, { variables: { widget_id: widget.id } });

  return loading ? (
    <Text>Carregando formulários PLIP</Text>
  ) : error ? (
    <Text color="red">{JSON.stringify(error)}</Text>
  ) : (
    <Stack spacing={4}>
      <Heading as="h2">Formulários gerados:</Heading>
      <Stack spacing={2}>
        {data.plips.map((p: Plip) =>
          <a key={p.unique_identifier} href={p.pdf_data} download={`plip-formulario-${p.unique_identifier}.pdf`}>
            <Text>{p.unique_identifier}</Text>
          </a>
        )}
      </Stack>
    </Stack>
  );
}

export default PlipsHomeScene;