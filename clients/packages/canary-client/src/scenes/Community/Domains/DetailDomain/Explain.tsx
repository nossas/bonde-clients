import React from 'react';
import { Header, Icon } from 'bonde-components';
import { Flex, HStack, Stack, Text } from 'bonde-components/chakra';
import {
  ActiveDomainIcon,
  CertifyDomainIcon,
  ConnectDomainIcon,
  InsertDomainIcon,
  PropagateDomainIcon
} from '../Icons';
import { Status, SmallText } from '../Styles';
import { DNSHostedZone, Certificate, IsPage } from '../types';

type Props = {
  dnsHostedZone: DNSHostedZone
  dnsIsActivated: boolean
  certificate?: Certificate
  isPage?: IsPage
}

const Explain = ({ dnsHostedZone, dnsIsActivated }: Props) => {
  return (
    <Stack direction="column" spacing={2}>
      <Text fontWeight="semibold" fontSize="sm" textTransform="uppercase">
        {!dnsIsActivated ? 'Entenda o processo' : 'Detalhes'}
      </Text>

      <Flex bg="white" px={4} py={6} justifyContent="space-around">
        <HStack spacing={25}>
          <Stack align="center" maxW={165}>
            <InsertDomainIcon />
            <Header.H5>Inserir domínio</Header.H5>
            <SmallText>O primeiro passo é comprar o domínio em um site como GoDaddy ou RegistroBR e inserir aqui no BONDE.</SmallText>
            <Status
              activeStatus='done'
              value='done'
              labels={{ 'done': 'Concluído' }}
            />
          </Stack>

          <Icon name='ArrowRight' size='small' />
        </HStack>

        <HStack spacing={25}>
          <Stack align="center" maxW={185}>
            <ConnectDomainIcon />
            <Header.H5>Conectar ao BONDE</Header.H5>
            <SmallText>Para conseguir usar seu endereço no BONDE, copie os registros abaixo e cole no site onde comprou seu domínio. <a href="http://www.faq.bonde.org/#block-7283" title='FAQ Dominios' target="_blank" rel="noopener noreferrer">Clique aqui</a> para ver o passo a passo.</SmallText>
            <Status
              isActived={() => !!(dnsHostedZone.status !== 'created' || dnsHostedZone.ns_ok)}
              labels={{ 'active': 'Concluído', 'inactive': 'Inativo' }}
            />
          </Stack>

          <Icon name='ArrowRight' size='small' />
        </HStack>

        <HStack spacing={25}>
          <Stack align="center" maxW={165}>
            <PropagateDomainIcon />
            <Header.H5>Propagar Domínio</Header.H5>
            <SmallText>O provedor onde você comprou seu domínio faz a propagação. Esse processo pode levar até <strong>48h</strong>.</SmallText>
            <Status
              isActived={() => dnsIsActivated}
              labels={{ active: 'Concluído', inactive: 'Inativo' }}
            />
          </Stack>

          <Icon name='ArrowRight' size='small' />
        </HStack>

        <HStack spacing={25}>
          <Stack direction="column" align="center" spacing={2} maxW={165}>
            <CertifyDomainIcon />
            <Header.H5>Certificar Domínio</Header.H5>
            <SmallText>Quando o domínio for propagado, o BONDE gera <strong>automaticamente </strong>um certificado de segurança. Isso leva poucos minutos.</SmallText>
          </Stack>

          <Icon name='ArrowRight' size='small' />
        </HStack>

        <HStack spacing={25}>
          <Stack direction="column" align="center" spacing={2} maxW={165}>
            <ActiveDomainIcon />
            <Header.H5>Domínio Ativo</Header.H5>
            <SmallText>
              Pronto! Seu domínio está  ativo e disponível para utilizar nas páginas da sua comunidade no BONDE. <a href={`https://app.bonde.org`}>Clique aqui</a> para ver suas páginas.
            </SmallText>
          </Stack>

          <Icon name='ArrowRight' size='small' />
        </HStack>
      </Flex>
    </Stack>
  );
}

export default Explain;
