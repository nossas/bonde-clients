import React from 'react';
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

const FormPanel = ({ hostedZones }) => {
  const onSubmit = async ({ customDomain }) => {
    console.log('submit', { customDomain });
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