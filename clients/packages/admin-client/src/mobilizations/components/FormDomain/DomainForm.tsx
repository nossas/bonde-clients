import React from 'react';
import { Stack, Text, Select, Link, Button, Box } from 'bonde-components/chakra';
import { Form, Field } from 'bonde-components/form';
import { DarkButton } from './DarkButton';
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
          <Stack spacing={7}>
            <Stack>
              <Text>Escolha algum <b>domínio principal</b> que já foi comprado e cadastrado no BONDE:</Text>
              <Stack direction="row" bg="gray.100" maxW={610} px={4} py={3} spacing={2} alignItems="center">
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
            <Stack>
              <Text>Não encontrou o domínio na lista?</Text>
              <Text>
                <Link
                  variant='highlighted'
                  href={process.env.REACT_APP_DOMAIN_ADMIN_CANARY + `/community/domains`}
                >
                  Clique aqui
                </Link> para cadastrar um novo domínio na comunidade.
              </Text>
            </Stack>
            <DarkButton>
              Salvar
            </DarkButton>
          </Stack>

        </form>
      )}
    </Form>
  </>
);

export default DomainForm;
