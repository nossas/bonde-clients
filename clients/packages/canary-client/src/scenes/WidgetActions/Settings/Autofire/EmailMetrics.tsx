import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Box, Text, Heading, Stat, StatLabel, StatNumber, Divider, StatGroup, Tooltip, Flex } from 'bonde-components/chakra';

const GET_EMAIL_STATS = gql`
  query EmailStats($widget_id: Int!) {
    email_stats(widget_id: $widget_id) {
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
    variables: { widget_id: widgetId }
  });

  if (error) {
    console.log('error', { error });
    return <Box color='red.500'>Erro ao carregar dados: {JSON.stringify(error)}</Box>;
  }

  if (loading) return 'Carregando...';

  const { open, delivered, bounced, processed, click, total } = data.email_stats.stats;

  const IconInfo = React.forwardRef(({ children, ...rest }, ref) => (
    <Box ref={ref} {...rest}>
       <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00603 14C10.8648 14 14 10.8621 14 7C14 3.13793 10.8648 0 7.00603 0C3.14729 0 0 3.13793 0 7C0 10.8621 3.14729 14 7.00603 14ZM7.00603 0.965517C10.3221 0.965517 13.0233 3.66897 13.0233 6.98793C13.0233 10.3069 10.3221 13.0103 7.00603 13.0103C3.68992 13.0103 0.988803 10.3069 0.988803 6.98793C0.988803 3.66897 3.68992 0.965517 7.00603 0.965517Z" fill="#AAAAAA"/>
      <path d="M7.10821 10.7037C6.92366 10.7037 6.76987 10.6524 6.64684 10.5497C6.53064 10.4403 6.47254 10.2864 6.47254 10.088V6.12702C6.47254 5.92863 6.53064 5.77813 6.64684 5.67552C6.76987 5.5729 6.92366 5.52159 7.10821 5.52159C7.29276 5.52159 7.44655 5.5729 7.56958 5.67552C7.69261 5.77813 7.75413 5.92863 7.75413 6.12702V10.088C7.75413 10.2864 7.69261 10.4403 7.56958 10.5497C7.44655 10.6524 7.29276 10.7037 7.10821 10.7037ZM7.10821 4.60832C6.87581 4.60832 6.69127 4.54675 6.55456 4.42361C6.41786 4.29363 6.34951 4.12603 6.34951 3.92079C6.34951 3.71556 6.41786 3.55138 6.55456 3.42824C6.69127 3.3051 6.87581 3.24353 7.10821 3.24353C7.33377 3.24353 7.5149 3.3051 7.6516 3.42824C7.79514 3.55138 7.86691 3.71556 7.86691 3.92079C7.86691 4.12603 7.79856 4.29363 7.66185 4.42361C7.52515 4.54675 7.3406 4.60832 7.10821 4.60832Z" fill="#AAAAAA"/>
      </svg>
      {children}
    </Box>
  ))

  return (
    <Box bg="white" p={6} boxShadow="sm">
      <Heading as="h3" size="xl" mb={1}>Métricas de E-mails</Heading>
      <Flex>
        <Text fontSize='sm'>DESDE O INÍCIO DA CAMPANHA </Text>
        <Tooltip label='Análise dos envios desde o início da campanha até o momento.' fontSize='md'>
          <IconInfo/>
        </Tooltip>
      </Flex>
      <Box py={6}>
        <Stat>
          <StatLabel>ENVIADOS</StatLabel>
          <StatNumber as="b" fontSize="5xl">{total}</StatNumber>
        </Stat>
      </Box>

      <Divider />

      <Box py={4}>
        <Flex>
          <Text fontSize="lg">Taxa de abertura </Text>
          <Tooltip label='Porcentagem de e-mails abertos, incluindo aberturas reais e automáticas' fontSize='md'>
            <IconInfo/>
          </Tooltip>
        </Flex>
        <StatGroup>
          <Stat>
            <StatNumber as="b" fontSize="4xl">{open}</StatNumber>
            <Flex>
              <StatLabel>ABERTOS </StatLabel>
              <Tooltip label='Porcentagem de e-mails que foram realmente abertos pelos destinatários.' fontSize='md'>
                <IconInfo/>
              </Tooltip>
            </Flex>
          </Stat>

          <Stat>
            <StatNumber as="b" fontSize="4xl">{delivered}</StatNumber>
            <Flex>
              <StatLabel>ENTREGUES </StatLabel>
              <Tooltip label='E-mail aceito pelo servidor do destinatário (Gmail, Yahoo, etc.), mas ainda não necessariamente na caixa de entrada.' fontSize='md'>
                <IconInfo/>
              </Tooltip>
            </Flex>
          </Stat>
        </StatGroup>
      </Box>

      <Divider />
      
      <StatGroup py={4}>
          <Stat>
            <StatNumber as="b" fontSize="4xl">{click}</StatNumber>
            <Flex>
              <StatLabel>CLIQUES </StatLabel>
              <Tooltip label='Percentual de destinatários que clicaram em links dentro dos e-mails em relação ao total de e-mails abertos.' fontSize='md'>
                <IconInfo/>
              </Tooltip>
            </Flex>
          </Stat>

          <Stat>
            <StatNumber as="b" fontSize="4xl">{bounced}</StatNumber>
            <Flex>
              <StatLabel>BOUNCE </StatLabel>
              <Tooltip label='Percentual de e-mails que não foram entregues aos destinatários devido a endereços inválidos ou outros problemas de entrega.' fontSize='md'>
                <IconInfo/>
              </Tooltip>
            </Flex>
          </Stat>
        </StatGroup>

        <StatGroup>
          <Stat>
            <StatNumber as="b" fontSize="4xl">{processed}</StatNumber>
            <Flex>
            <StatLabel>PROCESSADOS </StatLabel>
            <Tooltip label='O e-mail foi aceito pelo sistema e está pronto para ser enviado. ' fontSize='md'>
              <IconInfo/>
            </Tooltip>
            </Flex>
          </Stat>
        </StatGroup>
    </Box>
  );
};

export default EmailMetrics;
