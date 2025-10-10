import React from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription
} from 'bonde-components/chakra';
import { gql, useQuery } from 'bonde-core-tools';

const GET_SINGLESHOT_DATA = gql`
  query GetSingleShotData($widget_id: Int!) {
    pressure_targets(
      where: {
        widget_id: { _eq: $widget_id }
        identify: { _eq: "singleshot_csv_data" }
      }
    ) {
      id
      identify
      label
      email_subject
      email_body
      targets
    }
  }
`;

interface SingleShotEmailData {
  email: string;
  subject: string;
  body: string;
  [key: string]: any;
}

interface Props {
  widget_id: number;
  sender_email?: string;
  sender_name?: string;
}

const SingleShotSavedData: React.FC<Props> = ({ 
  widget_id, 
  sender_email,
  sender_name 
}) => {
  const { data, loading, error, refetch } = useQuery(GET_SINGLESHOT_DATA, {
    variables: { widget_id }
  });

  const savedData = data?.pressure_targets?.[0];
  const csvData: SingleShotEmailData[] = savedData?.targets || [];

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" />
        <Text mt={4}>Carregando dados salvos...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        <AlertDescription>Erro: {error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!savedData || csvData.length === 0) {
    return (
      <Box p={6} bg="gray.50" borderRadius="md" textAlign="center">
        <Text fontSize="5xl" mb={3}>📄</Text>
        <Text fontSize="lg" fontWeight="semibold" color="gray.600">
          Nenhum dado salvo
        </Text>
        <Text fontSize="sm" color="gray.500" mt={1}>
          Faça upload de um arquivo CSV e salve para ver os dados aqui.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <VStack align="start" spacing={0}>
          <Text fontSize="lg" fontWeight="semibold">
            💾 Dados do Disparo Salvo
          </Text>
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.600">
              ✓ {csvData.length} email(s) pronto(s) para envio
            </Text>
          </HStack>
        </VStack>
        <Button size="sm" onClick={() => refetch()}>
          🔄 Atualizar
        </Button>
      </HStack>

      {(sender_email || sender_name) && (
        <Box p={3} bg="blue.50" borderRadius="md" mb={4}>
          <Text fontSize="xs" color="gray.600" mb={1}>Configurado para enviar como:</Text>
          <Text fontSize="sm" fontWeight="semibold">
            {sender_name || 'Sem nome'} {'<'}{sender_email || 'não configurado'}{'>'}
          </Text>
        </Box>
      )}

      <Box maxH="400px" overflowY="auto" borderWidth={1} borderRadius="md">
        <Table size="sm" variant="striped">
          <Thead position="sticky" top={0} bg="gray.50" zIndex={1}>
            <Tr>
              <Th>#</Th>
              <Th>Email</Th>
              <Th>Assunto</Th>
              <Th>Corpo (prévia)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {csvData.map((row, index) => (
              <Tr key={index}>
                <Td fontWeight="semibold" color="gray.500">{index + 1}</Td>
                <Td fontSize="xs">{row.email}</Td>
                <Td fontSize="xs" maxW="200px" isTruncated>{row.subject}</Td>
                <Td fontSize="xs" maxW="250px" isTruncated>
                  {row.body.substring(0, 50)}
                  {row.body.length > 50 ? '...' : ''}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {csvData.length > 10 && (
        <Text fontSize="xs" color="gray.500" mt={2} textAlign="right">
          Total: {csvData.length} registros
        </Text>
      )}

      <Alert status="info" mt={4} borderRadius="md">
        <AlertIcon />
        <VStack align="start" spacing={1} fontSize="sm">
          <Text fontWeight="semibold">
            ✓ Dados salvos com sucesso no banco de dados
          </Text>
          <Text fontSize="xs" color="gray.600">
            Para enviar os emails, você pode implementar uma rotina de envio 
            que busca esses dados da tabela pressure_targets.
          </Text>
        </VStack>
      </Alert>
    </Box>
  );
};

export default SingleShotSavedData;