import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Flex,
  InputField,
  Heading,
  Text,
  Stack
} from "bonde-components";
import { useLazyQuery, gql } from "bonde-core-tools";

import type { Widget } from "../../FetchWidgets";
import Wizard from "./components/Wizard";

const GET_PLIP_FORM = gql`
  query ($code: uuid!) {
    plips(where: { unique_identifier: { _eq: $code } }) {
      id
      pdf_data
      unique_identifier
      created_at
      form_data
    }
  }
`;

interface FormData {
  name: string;
  state: string;
  signature_quantity: number;
}

interface Properties {
  widget: Widget
}

const QRForm: React.FC<Properties> = ({ widget }) => {
  const [formValues, setFormValues] = useState();
  const { code }: any = useParams();
  const [getPlipForm, { loading, error, data }] = useLazyQuery(GET_PLIP_FORM);

  useEffect(() => {
    getPlipForm({ variables: { code } });
  }, [code, getPlipForm])

  if (loading) return <p>Carregando formulário...</p>;
  if (error) return <p>Failed!</p>

  const handleSubmit = (values: any) => {
    console.log("TODO: submitting values >>>", values);
    setFormValues(values);
  }

  const formData: FormData = JSON.parse(data?.plips[0].form_data || "{}");

  return formValues ? (
    <Flex direction="column" flex={1}>
      <Flex flex={1} py={8}>
        <Heading fontSize="2xl">Tudo certo! Dados atualizados, agora temos 12.455 assinaturas pela Amazônia <span role="img" aria-label="Emoji">🎉</span></Heading>
      </Flex>
      <Stack py={4} borderTop="1px solid" borderColor="gray.100" spacing={2}>
        <Button as={Link} to={`/widgets/${widget.id}/settings/workflow`}>Atualizar outra ficha</Button>
        <Button as={Link} to={`/widgets/${widget.id}/settings`} variant="outline" colorScheme="black">Por agora é só</Button>
      </Stack>
    </Flex>
  ) : (
    <Wizard
      onSubmit={handleSubmit}
      initialValues={{
        unique_identify: code,
        confirmed_signatures: formData.signature_quantity
      }}
    >
      <Wizard.Page>
        <Stack spacing={4} flex={1} py={8}>
          <Heading fontSize="2xl">Confere aí:</Heading>
          <InputField
            name="unique_identify"
            label="Código da ficha"
          />
          <Text>Ficha de <strong>{formData.state}</strong> gerada por <strong>{formData.name}</strong>.</Text>
        </Stack>
      </Wizard.Page>
      <Wizard.Page>
        <Stack spacing={4} flex={1} py={8}>
          <Heading fontSize="2xl">Quantas assinaturas foram coletadas?</Heading>
          <InputField
            type="number"
            name="confirmed_signatures"
            label="Total de assinaturas"
          />
        </Stack>
      </Wizard.Page>
    </Wizard>
  );
}

export default QRForm;