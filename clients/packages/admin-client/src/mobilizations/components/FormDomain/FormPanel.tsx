import React from 'react';
import { gql, useMutation } from 'bonde-core-tools';
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab
} from 'bonde-components/chakra';
import ExternalDomainForm from './ExternalDomainForm';
import DomainForm from './DomainForm';
import SubdomainForm from './SubdomainForm';

const FormPanel = ({ hostedZones, mobilization }) => {
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
    <>
      <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">Tipo de domínio</Heading>
      <Tabs variant="enclosed" defaultIndex={defaultIndex}>
        <TabList>
          <Tab>Subdomínio</Tab>
          <Tab>Domínio Principal</Tab>
          <Tab>Domínio Externo</Tab>
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
    </>
  );
}

export default FormPanel;