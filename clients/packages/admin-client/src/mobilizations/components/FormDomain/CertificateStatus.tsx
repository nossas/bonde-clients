import React from 'react';
import { Heading, Text, Stack, Flex } from 'bonde-components/chakra';
import CheckIcon from "../../../icons/CheckIcon"
import LoadingIcon from "../../../icons/LoadingIcon"

interface Certificate {
  id: number;
  domain: string;
  is_active: boolean;
  dns_hosted_zone_id: number;
}

interface HostedZone {
  id: number;
  domain_name: string;
  status: string;
  ns_ok?: boolean;
  hosted_zone?: any;
  delegation_set?: any;
  is_external_domain: boolean;
  certificates: Certificate[];
}

interface Properties {
  customDomain?: string;
  hostedZones?: HostedZone[];
}

const CertificateStatus: React.FC<Properties> = ({ customDomain, hostedZones = [] }) => {
  const domain: any | undefined = hostedZones.filter(
    (v) => customDomain?.endsWith(v.domain_name)
  )[0];
  const hasCertificate = domain?.certificates[0]?.is_active
  const isExternalDomain = domain?.is_external_domain
  const failedIp = !domain?.ns_ok && isExternalDomain

  return (
    <Stack mt={6}>
      <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">
        Status
      </Heading>

      {/* INATIVO */}
      {!customDomain && (
        <>
          <Text fontSize="sm" fontWeight="bold">Inativo</Text>
          <Text>Pode levar até 5 minutos para o certificado ser gerado e o endereço ficar disponível.</Text>
        </>
      )}

      {/* GERANDO CERTIFICADO  */}
      {customDomain && !domain?.certificates[0] && !isExternalDomain && (
        <>
          <Flex >
            <LoadingIcon />
            <Text fontSize="sm" fontWeight="bold" ml={2} textTransform="uppercase" color="gray.400">Gerando certificado</Text>
          </Flex>
          <Text>Em poucos minutos o endereço <b>{customDomain}</b> estará disponível.</Text>
        </>
      )}

      {/* CERTIFICADO ATIVO */}
      {hasCertificate && (
        <>
          <Flex>
            <CheckIcon />
            <Text fontSize="sm" color="green.200" fontWeight="bold" textTransform="uppercase">Ativo</Text>
          </Flex>
          <Text>O endereço <b>{domain?.domain_name}</b> está ativo e com certificado de segurança.</Text>
        </>
      )}

      {/* FALTOU CONFIGURAR IP */}
      {failedIp && (
        <Flex >
          <LoadingIcon />
          <Text fontSize="sm" fontWeight="bold" ml={2} textTransform="uppercase" color="gray.400">Ops, falta configurar o ip</Text>
        </Flex>
      )}
    </Stack>
  );
}

export default CertificateStatus;
