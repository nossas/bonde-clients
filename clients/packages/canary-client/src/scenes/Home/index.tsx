import React from 'react';
import { Container, SimpleGrid, Box } from "bonde-components";
import CommunitiesGadget from './CommunitiesGadget';
import MobilizationsGadget from './MobilizationsGadget';

const HomePage = (): React.ReactElement => (
  <Container>
    <SimpleGrid columns={[1, null, null, 2]} spacing={8}>
      <Box>
        <CommunitiesGadget />
      </Box>
      <Box>
        <MobilizationsGadget />
      </Box>
    </SimpleGrid>
  </Container>
);

export default HomePage;
