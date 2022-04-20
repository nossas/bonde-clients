import React from 'react';
import { Button, Stack, Text, Input, Select, Flex, Box } from 'bonde-components/chakra';
import { Form, Field } from 'bonde-components/form';

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
            <Stack>
              <Text>Personalize o subdomínio abaixo e clique em salvar para gerar o certificado:</Text>
              <Flex bg="gray.100" height={14} alignItems="center">
                <Text ml={8}>https://www.</Text>
                <Field name="subdomain" >
                  {({ input }) => <Input {...input} variant="outline" ml={1} borderRadius="4px" placeholder="escreva seu subdomínio" />}
                </Field>
                <Field name="domain">
                  {({ input }) => (
                    <Select {...input} ml={1} mr={8} variant='outline' borderRadius="4px" placeholder="selecione um domínio">
                      {hostedZones.map(({ domain_name: domain }) =>
                        <option key={domain}>{domain}</option>
                      )}
                    </Select>
                  )}
                </Field>
              </Flex>
              <Box style={{ marginLeft: "86%" }}>
                <Button maxW={32} type='submit'>Salvar</Button>
              </Box>
            </Stack>
          </form>
        )}
      </Form>
    </>
  );
}



export default SubdomainForm;
