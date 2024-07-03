import React from 'react';
import styled from 'styled-components';

import { useQuery, gql } from 'bonde-core-tools';
import { 
  Box,
  Divider,
  Flex,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  Tooltip
} from "bonde-components/chakra";

import { IconInfo, IconOpen, IconSend } from './icons';

const EmailMetricsStyled = styled.div`
  .emailStat--number {
    font-weight: 900;
  }
`;


const GET_EMAIL_STATS = gql`
  query EmailStats($widget_id: Int!, $category: String) {
    email_stats(widget_id: $widget_id, category: $category) {
      stats {
        open
        delivered
        bounced
        processed
        click
        total
      }
    }
  }
`;

type EmailMetricsProps = {
  widgetId: number;
};

const EmailMetrics = ({ widgetId }: EmailMetricsProps) => {
  const { data, loading, error } = useQuery(GET_EMAIL_STATS, {
    variables: { widget_id: widgetId, category: "autofire" }
  });

  if (error) {
    console.log('error', { error });
    return <Box color='red.500'>Erro ao carregar dados: {JSON.stringify(error)}</Box>;
  }

  if (loading) return 'Carregando...';

  const { open, delivered, bounced, processed, click, total } = data.email_stats.stats;
  
  const openRate = total > 0 ? (open / total * 100).toFixed(2) : 0;
  const deliveredRate = total > 0 ? (delivered / total * 100).toFixed(2) : 0;
  const bouncedRate = total > 0 ? (bounced / total * 100).toFixed(2) : 0;
  const processedRate = total > 0 ? (processed / total * 100).toFixed(2) : 0;
  const clickRate = open > 0 ? (click / open * 100).toFixed(2) : 0;

  return (
    <EmailMetricsStyled>
      <Box bg="white" p={6} boxShadow="sm">
        <Heading as="h3" size="2xl" mb={1}>Métricas de E-mails</Heading>
        <Flex align="center">
          <Text textTransform="uppercase" fontSize='sm' color="#858585" mr={2}>DESDE O INÍCIO DA CAMPANHA</Text>
          <Tooltip label='Análise dos envios desde o início da campanha até o momento.' fontSize='md'>
            <IconInfo />
          </Tooltip>
        </Flex>
        <Box py={6}>
          <Stat>
            <Flex align="center">
              <IconSend />
              <StatLabel textTransform="uppercase" ml={2}>EMAILS ENVIADOS</StatLabel>
            </Flex>
            <StatNumber className="emailStat--number" as="b" fontSize="5xl">{total}</StatNumber>
          </Stat>
        </Box>

        <Divider />

        <Box py={6}>
          <Flex align="center">
            <IconOpen />
            <Text textTransform="uppercase" fontSize="sm" mx={2}>Taxa de abertura</Text>
            <Tooltip label='Porcentagem de e-mails abertos, incluindo aberturas reais e automáticas' fontSize='md'>
              <IconInfo />
            </Tooltip>
          </Flex>
          <StatGroup>
            <Stat>
              <StatNumber className="emailStat--number" as="b" fontSize="4xl">{openRate}%</StatNumber>
              <Flex align="center">
                <StatLabel textTransform="uppercase" mr={2}>ABERTOS</StatLabel>
                <Tooltip label='Porcentagem de e-mails que foram realmente abertos pelos destinatários.' fontSize='md'>
                  <IconInfo />
                </Tooltip>
              </Flex>
            </Stat>

            <Stat>
              <StatNumber className="emailStat--number" as="b" fontSize="4xl">{deliveredRate}%</StatNumber>
              <Flex align="center">
                <StatLabel textTransform="uppercase" mr={2}>ENTREGUES</StatLabel>
                <Tooltip label='E-mail aceito pelo servidor do destinatário (Gmail, Yahoo, etc.), mas ainda não necessariamente na caixa de entrada.' fontSize='md'>
                  <IconInfo />
                </Tooltip>
              </Flex>
            </Stat>
          </StatGroup>
        </Box>

        <Divider/>
       
       <Box pt={6}>
          <StatGroup pb={6}>
            <Stat>
              <StatNumber className="emailStat--number" as="b" fontSize="4xl">{clickRate}%</StatNumber>
              <Flex align="center">
                <StatLabel textTransform="uppercase" mr={2}>CLIQUES</StatLabel>
                <Tooltip label='Percentual de destinatários que clicaram em links dentro dos e-mails em relação ao total de e-mails abertos.' fontSize='md'>
                  <IconInfo />
                </Tooltip>
              </Flex>
            </Stat>

            <Stat>
              <StatNumber className="emailStat--number" as="b" fontSize="4xl">{bouncedRate}%</StatNumber>
              <Flex align="center">
                <StatLabel textTransform="uppercase" mr={2}>BOUNCE</StatLabel>
                <Tooltip label='Percentual de e-mails que não foram entregues aos destinatários devido a endereços inválidos ou outros problemas de entrega.' fontSize='md'>
                  <IconInfo />
                </Tooltip>
              </Flex>
            </Stat>
          </StatGroup>
          <StatGroup>
            <Stat>
              <StatNumber className="emailStat--number" as="b" fontSize="4xl">{processedRate}%</StatNumber>
              <Flex align="center">
                <StatLabel textTransform="uppercase" mr={2}>PROCESSADOS</StatLabel>
                <Tooltip label='O e-mail foi aceito pelo sistema e está pronto para ser enviado. ' fontSize='md'>
                  <IconInfo />
                </Tooltip>
              </Flex>
            </Stat>
          </StatGroup>
        </Box>
        <Flex align="center" pt={6}>
          <Text fontSize="xs">
            Os dados de campanhas anteriores a 12/06/2024 podem estar incompletos ou inconsistentes devido a uma atualização na base de dados.
          </Text>
        </Flex>
      </Box>
    </EmailMetricsStyled>
  );
};

export default EmailMetrics;
