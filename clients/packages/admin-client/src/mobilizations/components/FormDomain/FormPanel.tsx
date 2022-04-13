import React from 'react';
import { gql, useMutation } from 'bonde-core-tools';
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Stack,
  Text
} from 'bonde-components/chakra';
import CustomTab from './CustomTab';
import ExternalDomainForm from './ExternalDomainForm';
import DomainForm from './DomainForm';
import SubdomainForm from './SubdomainForm';

export const FormPanel = ({ hostedZones, mobilization }) => {
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

  const onSubmit = async ({ customDomain }) => {
    await updateMobilization({ variables: { id: mobilization.id, customDomain: `www.${customDomain}` } });
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

export const Status = () => (
  <Stack mt={6}>
    <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">
      Status
    </Heading>
    <Text>Pode levar até 5 minutos para o certificado ser gerado e o endereço ficar disponível.</Text>
  </Stack>
)


