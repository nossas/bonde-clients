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
    await updateMobilization({ variables: { id: mobilization.id, customDomain } });
  }

  return (
    <>
      <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">Tipo de domínio</Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Subdomínio</Tab>
          <Tab>Domínio Principal</Tab>
          <Tab>Domínio Externo</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SubdomainForm onSubmit={onSubmit} hostedZones={hostedZones} />
          </TabPanel>
          <TabPanel>
            <DomainForm onSubmit={onSubmit} hostedZones={hostedZones} />
          </TabPanel>
          <TabPanel>
            <ExternalDomainForm onSubmit={onSubmit} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default FormPanel;