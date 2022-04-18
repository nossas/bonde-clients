import { Heading, Text, Stack } from 'bonde-components/chakra';
import React from 'react';

interface Properties {
  customDomain?: string;
  hostedZones?: any[];
}


const CertificateStatus: React.FC<Properties> = ({ customDomain, hostedZones = [] }) => {
  const certificate = hostedZones.filter((v) => v.domain_name === customDomain?.replace('www.', ''))[0]?.certificates[0];

  return (
    <Stack mt={6}>
      <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">
        Status
      </Heading>
      {!certificate?.is_active
        ? <Text>Pode levar até 5 minutos para o certificado ser gerado e o endereço ficar disponível.</Text>
        : (
          <>
            <Text>Ativo</Text>
            <Text>Endereço ativo e com certificado de segurança.</Text>
          </>
        )
      }
    </Stack>
  );
}

export default CertificateStatus;
