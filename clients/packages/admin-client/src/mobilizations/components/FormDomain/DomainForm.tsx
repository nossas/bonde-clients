import React from 'react';
import { Stack, Text, Select, Link, Button, Flex, Box } from 'bonde-components/chakra';
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
            <Flex bg="gray.100" height={14} alignItems="center" >
              <Text ml={8}>https://www.</Text>
              <Field name="customDomain">
                {({ input }) => (
                  <Select {...input} ml={1} mr={8} variant='outline' borderRadius="4px" placeholder="selecione um domínio" >
                    {hostedZones.map(({ domain_name: domain }) =>
                      <option key={domain}>{domain}</option>
                    )}
                  </Select>
                )}
              </Field>
            </Flex>
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
