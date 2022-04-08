import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'bonde-components/chakra';
import ExternalDomainForm from './ExternalDomainForm';
import DomainForm from './DomainForm';
import SubdomainForm from './SubdomainForm';

const FormPanel = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Subdomínio</Tab>
        <Tab>Domínio Principal</Tab>
        <Tab>Domínio Externo</Tab>      
      </TabList>
      <TabPanels>
        <TabPanel>
          <SubdomainForm />
        </TabPanel>
        <TabPanel>
          <DomainForm />
        </TabPanel>
        <TabPanel>
          <ExternalDomainForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default FormPanel;