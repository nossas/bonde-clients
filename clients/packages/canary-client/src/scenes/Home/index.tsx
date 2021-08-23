import React from 'react';
import { SimpleGrid, Box } from "bonde-components";
import Content from '../../components/Content';
import CommunitiesGadget from './CommunitiesGadget';
import MobilizationsGadget from './MobilizationsGadget';

const HomePage = (): React.ReactElement => (
  <Content>
    <SimpleGrid columns={[1, null, null, 2]} spacing={8}>
      <Box>
        <CommunitiesGadget />
      </Box>
      <Box>
        <MobilizationsGadget />
      </Box>
    </SimpleGrid>
  </Content>
);

export default HomePage;
