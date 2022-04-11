import React from 'react';
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  // Radio,
  // useTab,
  // useMultiStyleConfig
} from 'bonde-components/chakra';
import { Form } from 'bonde-components/form';
import ExternalDomainForm from './ExternalDomainForm';
import DomainForm from './DomainForm';
import SubdomainForm from './SubdomainForm';

// const RadioTab: React.FC<any> = React.forwardRef((props, ref: any) => {
//   // 1. Reuse the `useTab` hook
//   const tabProps = useTab({ ...props, ref });
//   const isSelected = !!tabProps['aria-selected'];

//   // 2. Hook into the Tabs `size`, `variant`, props
//   const styles = useMultiStyleConfig('Tabs', tabProps);

//   return (
//     <Radio __css={styles.tab} {...tabProps} defaultChecked={isSelected}>
//       {tabProps.children}
//     </Radio>
//   );
// });

const FormPanel = ({ hostedZones }) => {

  const onSubmit = async (values: any) => {
    console.log("values", values);
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">Tipo de domínio</Heading>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Subdomínio</Tab>
              <Tab>Domínio Principal</Tab>
              <Tab>Domínio Externo</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SubdomainForm hostedZones={hostedZones} />
              </TabPanel>
              <TabPanel>
                <DomainForm hostedZones={hostedZones} />
              </TabPanel>
              <TabPanel>
                <ExternalDomainForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </form>
      )}
    </Form>
  );
}

export default FormPanel;