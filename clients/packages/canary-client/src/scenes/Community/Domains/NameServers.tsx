import React from 'react';
import {
  Text,
  Tooltip,
  toast,
  Success,
  Icon,
  Grid,
  GridItem,
  Box,
  Stack,
  Button
} from 'bonde-components';
import copy from 'clipboard-copy';
import { MainTitle } from './Styles';

const NameServers = ({ dnsHostedZone }: any) => {
  return (
    <Stack direction="column" spacing={2}>
      <MainTitle>
        {`Registros de nome (Name servers)`}
        <Tooltip info='Os registros de nome ("name servers" na gringa) são usados para conectar seu domínio ao BONDE.' />
      </MainTitle>
      <Box bg="white" boxShadow="sm" p={4}>
        <Grid templateColumns='1fr auto' rowGap={4}>
          {dnsHostedZone.name_servers.map((ns: string) => (
            <>
              <GridItem>
                <Text>{ns}</Text>
              </GridItem>
              <GridItem>
                <Button
                  variant="link"
                  colorScheme="gray"
                  onClick={() => {
                    copy(ns)
                    toast(<Success message='Name Server copiado com sucesso!' />, { type: toast.TYPE.SUCCESS });
                  }}
                >
                  <Icon size='small' name='Copy' /> Copiar
                </Button>
              </GridItem>
            </>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

export default NameServers;