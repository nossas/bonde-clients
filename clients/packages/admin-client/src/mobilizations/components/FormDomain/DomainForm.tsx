import React from 'react';
import { Stack, Text, Select, Link, Button, Box } from 'bonde-components/chakra';
import { Form, Field } from 'bonde-components/form';
interface Properties {
  customDomain?: string;
  onSubmit: ({ customDomain }) => Promise<void>;
  hostedZones?: { domain_name: string }[];
}

const DomainForm: React.FC<Properties> = ({ customDomain, onSubmit, hostedZones = [] }) => (
  <>
    <Form
      initialValues={customDomain ? { customDomain: customDomain.replace('www.', '') } : null}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Stack>
            <Text>Selecione o domínio cadastrado na sua comunidade:</Text>
            <Stack direction="row" bg="gray.100" px={4} py={3} spacing={2} alignItems="center" >
              <Text>https://www.</Text>
              <Field name="customDomain">
                {({ input }) => (
                  <Select {...input} variant='outline' placeholder="selecione um domínio" >
                    {hostedZones.map(({ domain_name: domain }) =>
                      <option key={domain}>{domain}</option>
                    )}
                  </Select>
                )}
              </Field>
            </Stack>
          </Stack>

          <Stack mt={7}>
            <Text>Não encontrou o domínio na lista?</Text>
            <Text>
              <Link
                variant='highlighted'
                href={process.env.REACT_APP_DOMAIN_ADMIN_CANARY + `/community/domains`}
              >
                Clique aqui
              </Link> para cadastrar um novo domínio na comunidade.
            </Text>
            <Box style={{ marginLeft: "90%" }}>
              <Button maxW={32} type="submit">Salvar</Button>
            </Box>
          </Stack>
        </form>
      )}
    </Form>
  </>
);

export default DomainForm;
