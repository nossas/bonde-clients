import React from 'react';
import { gql, useMutation, checkDNS } from 'bonde-core-tools';
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

const IP_LISTS = [
  '54.85.56.248',
  '3.236.227.166'
]

export const FormPanel = ({ hostedZones, mobilization }) => {
  const toast = useToast();
  // Active tab by custom domain type
  let defaultIndex = 0;
  const { custom_domain: customDomain } = mobilization;
  /* eslint-disable no-useless-escape */
  const subdomainRegex = (zone) => new RegExp(`^www\..+\.${zone.domain_name}$`).test(customDomain);
  const rootDomainRegex = (zone) => new RegExp(`^www\.${zone.domain_name}$`).test(customDomain);
  /* eslint-disable no-useless-escape */
  const internalHostedZones = hostedZones.filter((dns) => !dns.is_external_domain);

  if (!customDomain || internalHostedZones.some(subdomainRegex)) defaultIndex = 0;
  else if (!!customDomain && !internalHostedZones.some(subdomainRegex) && !internalHostedZones.some(rootDomainRegex)) defaultIndex = 2;
  else if (internalHostedZones.some(rootDomainRegex)) defaultIndex = 1;

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
      mutation ($customDomain: String!, $comment: String!, $communityId: Int!) {
        insert_dns_hosted_zones_one(
          object: {
            domain_name: $customDomain,
            comment: $comment,
            community_id: $communityId,
            is_external_domain: true
          }
        ) {
          id
          domain_name
          ns_ok
        }
      }
    `
  );
  const [updateDnsHostedZone] = useMutation(
    gql`
      mutation ($id: Int!) {
        update_dns_hosted_zones_by_pk(
          pk_columns: { id: $id }, _set: { ns_ok: true }
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
        // Create dns hosted zone
        const { data } = await createDnsHostedZone({
          variables: {
            customDomain,
            communityId: mobilization.community_id,
            comment: `mobilization_id:${mobilization.id}`
          }
        });

        // Verify IP configuration to dispatch certificate
        if (data?.insert_dns_hosted_zones_one) {
          if (await checkDNS(customDomain, 'A', { ip: IP_LISTS })) {
            await updateDnsHostedZone({
              variables: {
                id: data?.insert_dns_hosted_zones_one.id
              }
            })
          }
        }
      } else {
        const hostedZone = internalHostedZones.filter((hz) => customDomain.endsWith(hz.domain_name))[0];
        if (!hostedZone.ns_ok) {
          if (await checkDNS(customDomain, 'NS', { ns: hostedZone.name_servers })) {
            await updateDnsHostedZone({ variables: { id: hostedZone.id } })
          }
        }
      }

      await updateMobilization({ variables: { id: mobilization.id, customDomain: `www.${customDomain}` } });
      toast({ title: 'Domínio registrado com sucesso!', status: 'success', isClosable: true });
    } catch (err: any) {
      toast({
        title: 'Falha ao submeter formulário',
        description: err?.message || err,
        status: 'error',
        isClosable: true
      });
    }
  }

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
              hostedZones={internalHostedZones}
            />
          </TabPanel>
          <TabPanel>
            <DomainForm
              customDomain={defaultIndex === 1 ? customDomain : null}
              onSubmit={onSubmit}
              hostedZones={internalHostedZones}
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


