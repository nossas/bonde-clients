import React from 'react';
import { Stack, Text, Input, Select } from 'bonde-components/chakra';
import { Form, Field } from 'bonde-components/form';
import { DarkButton } from './DarkButton';

interface Properties {
  onSubmit: ({ customDomain }) => Promise<void>;
  customDomain?: string;
  hostedZones?: { domain_name: string }[];
}

const SubdomainForm: React.FC<Properties> = ({ customDomain, hostedZones = [], onSubmit }) => {
  const subdomain = (customDomain?.match(new RegExp(/^www.([\w|-]+)./)) || [])[1];
  const domain = (customDomain?.match(new RegExp(/^www.[\w|-]+.(.+)$/)) || [])[1];

  return (
    <>
      <Form
        initialValues={customDomain ? { subdomain, domain } : null}
        onSubmit={async ({ subdomain, domain }) => await onSubmit({ customDomain: `${subdomain}.${domain}` })}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={7}>
              <Stack>
                <Text><b>Subdomínio</b> é um endereço personalizado a partir de um domínio que você já cadastrou aqui no BONDE (ex: campanha.seudominio.org).</Text>
                <Text>Personalize o subdomínio abaixo e clique em salvar:</Text>
                <Stack direction="row" bg="gray.100" maxW={670} px={4} py={3} spacing={2} alignItems="center" >
                  <Text>https://www.</Text>
                  <Field name="subdomain" >
                    {({ input }) => <Input {...input} variant="outline" placeholder="escreva seu subdomínio" />}
                  </Field>
                  <Field name="domain">
                    {({ input }) => (
                      <Select {...input} variant='outline' placeholder="selecione um domínio">
                        {hostedZones.map(({ domain_name: domain }) =>
                          <option key={domain}>{domain}</option>
                        )}
                      </Select>
                    )}
                  </Field>
                </Stack>
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
}

export default SubdomainForm;
