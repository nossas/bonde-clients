import React from 'react';
import {
  // Button,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Skeleton,
  Stack,
  Heading,
  Select
} from 'bonde-components';
import { checkStatus } from './utils';
import { useQueryFilters } from './useQueryFilters';

const PlipsFormTable: React.FC<{ widgetId: number }> = ({ widgetId }) => {
  const {
    data,
    loading,
    limit,
    // onNextPage,
    // onPreviousPage,
    onChangeStatus
  }: any = useQueryFilters(widgetId);

  return (
    <Stack spacing={4}>
      <Heading
        as="h5"
        size="xs"
        fontWeight="normal"
        color="gray.400"
        textTransform="uppercase"
      >
        Todas as fichas ({limit})
        {/* <Button onClick={onPreviousPage} colorScheme="gray">Previous Page</Button>
        <Button onClick={onNextPage}>Next Page</Button> */}
        <Select onChange={(e: any) => onChangeStatus(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="pendentes">Pendentes</option>
          <option value="concluidos">Concluídos</option>
          <option value="inscritos">Inscritos</option>
        </Select>
        {/* <Button onClick={() => onChangeStatus('pendentes')}>Change status</Button> */}
      </Heading>
      <Table variant="simple" bg="white">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Estado</Th>
            <Th>Assinaturas</Th>
            <Th>Data da inscrição</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        {loading ? (
          <Skeleton height="150px" />
        ) : (
          <Tbody>
            {data.plips.map((pf: any, index: number) => (
              <Tr key={`plips-form-${index}`}>
                <Td>{pf.name}</Td>
                <Td>{pf.email}</Td>
                <Td>{pf.state}</Td>
                <Td>{pf.expected_signatures || 0}</Td>
                <Td>{new Date(pf.created_at).toLocaleDateString()}</Td>
                <Td>
                  {checkStatus(pf)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Stack>
  );
}

export default PlipsFormTable;