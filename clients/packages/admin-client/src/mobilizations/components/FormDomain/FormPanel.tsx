import React from 'react';
import { gql, useMutation } from 'bonde-core-tools';
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Stack,
  Text,
  useToast
} from 'bonde-components/chakra';
import CustomTab from './CustomTab';
import ExternalDomainForm from './ExternalDomainForm';
import DomainForm from './DomainForm';
import SubdomainForm from './SubdomainForm';

export const FormPanel = ({ hostedZones, mobilization }) => {
  const toast = useToast();

  // Submit action to update custom domain on mobilization
  const [updateMobilization] = useMutation(
    gql`
      mutation ($id: Int!, $customDomain: String!) {
        update_mobilizations_by_pk(pk_columns: { id: $id }, _set: { custom_domain: $customDomain }) {
          id
          custom_domain
        }
      }
    `
  );
  const [createDnsHostedZone] = useMutation(
    gql`
      mutation ($customDomain: String!, $comment: String!) {
        insert_dns_hosted_zones_one(
          object: { domain_name: $customDomain, comment: $comment, is_external_domain: true }
        ) {
          id
          domain_name
          ns_ok
        }
      }
    `
  );

  const onSubmit = async ({ customDomain, isExternalDomain = false }: { customDomain: string, isExternalDomain?: boolean }) => {
    try {
      if (isExternalDomain) {
        await createDnsHostedZone({ variables: { customDomain, comment: `mobilization_id:${mobilization.id}` } });
      }
      await updateMobilization({ variables: { id: mobilization.id, customDomain: `www.${customDomain}` } });
    } catch (err: any) {
      toast({
        title: 'Falha ao submeter formulário',
        description: err?.message || err,
        status: 'error',
        isClosable: true
      });
    }
  }

  // Active tab by custom domain type
  let defaultIndex = 0;
  const { custom_domain: customDomain } = mobilization;
  /* eslint-disable no-useless-escape */
  const subdomainRegex = (zone) => new RegExp(`^www\..+\.${zone.domain_name}$`).test(customDomain);
  const rootDomainRegex = (zone) => new RegExp(`^www\.${zone.domain_name}$`).test(customDomain);
  /* eslint-disable no-useless-escape */

  if (!customDomain || hostedZones.some(subdomainRegex)) defaultIndex = 0;
  else if (!!customDomain && !hostedZones.some(subdomainRegex) && !hostedZones.some(rootDomainRegex)) defaultIndex = 2;
  else if (hostedZones.some(rootDomainRegex)) defaultIndex = 1;

  return (
    <Stack direction='column' spacing={2}>
      <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">Tipo de domínio</Heading>
      <Tabs variant="unstyled" mt={0} defaultIndex={defaultIndex}>
        <TabList>
          <CustomTab>Subdomínio</CustomTab>
          <CustomTab>Domínio Principal</CustomTab>
          <CustomTab>Domínio Externo</CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SubdomainForm
              customDomain={defaultIndex === 0 ? customDomain : null}
              onSubmit={onSubmit}
              hostedZones={hostedZones}
            />
          </TabPanel>
          <TabPanel>
            <DomainForm
              customDomain={defaultIndex === 1 ? customDomain : null}
              onSubmit={onSubmit}
              hostedZones={hostedZones}
            />
          </TabPanel>
          <TabPanel>
            <ExternalDomainForm
              customDomain={defaultIndex === 2 ? customDomain : null}
              onSubmit={onSubmit} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

export const DomainTypes = () => (
  <Stack maxWidth={380}>
    <Heading
      fontWeight="bold"
      fontSize="lg"
    >
      Tipos de Domínio
    </Heading>
    <Text><b>Subdomínio:</b> endereço personalizado a partir de um domínio que você já cadastrou aqui no BONDE (ex: novacampanha.seudominio.org). </Text>
    <Text><b>Domínio principal:</b> escolha algum domínio que já foi comprado e cadastrado na comunidade (ex: seudominio.org). </Text>
    <Text><b>Domínio externo:</b> selecione essa opção para adicionar um novo endereço que você comprou e configurar o DNS externamente. </Text>
  </Stack>
)


