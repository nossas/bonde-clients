import React from 'react';
import { gql, useMutation, checkDNS } from 'bonde-core-tools';
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Stack,
  useToast
} from 'bonde-components/chakra';
import CustomTab from './CustomTab';
import ExternalDomainForm from './ExternalDomainForm';
import DomainForm from './DomainForm';
import SubdomainForm from './SubdomainForm';
// TODO: rever import
import { connect } from 'react-redux';
import * as dnsControlActions from '../../../community/action-creators/dns-control';

import DomainAutocomplete from './DomainAutocomplete';

const IP_LISTS = [
  '54.85.56.248',
  '3.236.227.166'
]

interface FormPanelProperties {
  hostedZones: any[];
  mobilization: any;
}

export const FormPanel: React.FC<FormPanelProperties> = ({
  hostedZones,
  mobilization
}) => {
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

  const [routerAddOperation] = useMutation(
    gql`
      mutation ($domains: [String]!) {
        router_add_operation(operation: "append", domains: $domains) {
          message
        }
      }
    `
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("e.target ->>", e.target)
    const customDomain = e.target.customDomain.value;
    console.log("customDomain ->>", customDomain)
    try {
      // const hostedZone = internalHostedZones.filter((hz) => customDomain.endsWith(hz.domain_name))[0];
      // const { data: { update_mobilizations_by_pk } } = await updateMobilization({ variables: { id: mobilization.id, customDomain: `www.${customDomain}` } });
      await routerAddOperation({ variables: { domains: [customDomain, `www.${customDomain}`] }});
      await updateMobilization({ variables: { id: mobilization.id, customDomain: `www.${customDomain}` } });

      toast({ title: 'Domínio registrado com sucesso!', status: 'success', isClosable: true });
    } catch (err: any) {
      console.log("err", err);
      if (!customDomain) {
        toast({
          title: 'Falha ao atualizar o domínio',
          description: 'O endereço não pode ficar em branco',
          status: 'error',
          isClosable: true
        })
      }
      else {
        toast({
          title: 'Falha ao atualizar o domínio',
          description: 'Esse endereço já está sendo usado em outra página.',
          status: 'error',
          isClosable: true
        })
      }
    }
  }

  return (
    <Stack minW={[200, 400, 400, 400, 1047]} spacing={2}>
      {/* <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">Tipo de domínio</Heading> */}
      {/* <Tabs variant="unstyled" mt={0} defaultIndex={defaultIndex}>
        <TabList ml={-4} textColor="gray.400">
          <CustomTab textTransform="uppercase">Subdomínio</CustomTab>
          <CustomTab textTransform="uppercase">Domínio Principal</CustomTab>
          <CustomTab textTransform="uppercase">Domínio Externo</CustomTab>
        </TabList>
        <TabPanels ml={-4}>
          <TabPanel>
            <SubdomainForm
              customDomain={defaultIndex === 0 ? customDomain : null}
              onSubmit={onSubmit}
              hostedZones={internalHostedZones.filter((dns) => dns.ns_ok)}
            />
          </TabPanel>
          <TabPanel>
            <DomainForm
              customDomain={defaultIndex === 1 ? customDomain : null}
              onSubmit={onSubmit}
              hostedZones={internalHostedZones.filter((dns) => dns.ns_ok)}
            />
          </TabPanel>
          <TabPanel>
            <ExternalDomainForm
              customDomain={defaultIndex === 2 ? customDomain : null}
              onSubmit={onSubmit} />
          </TabPanel>
        </TabPanels>
      </Tabs> */}
      <form onSubmit={handleSubmit}>
        <DomainAutocomplete name="customDomain" domains={internalHostedZones.map(item => item.domain_name)} />
        <button type="submit">Salvar</button>
      </form>
    </Stack>
  );
}

export default connect(undefined, { updateDomain: dnsControlActions.updateDomain })(FormPanel);
