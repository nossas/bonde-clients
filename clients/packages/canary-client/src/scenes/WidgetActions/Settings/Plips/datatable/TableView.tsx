import React from 'react';
import {
  FormControl,
  FormLabel,
  Button,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableCaption,
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
    total,
    loading,
    pageIndex,
    pages,
    onNextPage,
    onPreviousPage,
    onChangeStatus,
    onChangeLimit
  } = useQueryFilters(widgetId);

  console.log("pageIndex, pages", { pageIndex, pages });
  return (
    <Stack spacing={4}>
      <Flex direction='row' justify="space-between" align='end'>
        <Heading
          as="h5"
          size="xs"
          fontWeight="normal"
          color="gray.400"
          textTransform="uppercase"
        >
          Todas as fichas ({total})
        </Heading>
        <Stack direction='row' spacing={2}>
          {/* <FormControl as={Stack} spacing={2} direction='row' align='end'>
            <FormLabel>Estado</FormLabel>
            <Select w='auto' minW='150px' onChange={(e: any) => onChangeStatus(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="ES">ES</option>
              <option value="AC">AC</option>
              <option value="PE">PE</option>
            </Select>
          </FormControl> */}
          <FormControl as={Stack} spacing={2} direction='row' align='end'>
            <FormLabel>Status</FormLabel>
            <Select w='auto' minW='150px' onChange={(e: any) => onChangeStatus(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="pendentes">Pendentes</option>
              <option value="concluidos">Concluídos</option>
              <option value="inscritos">Inscritos</option>
            </Select>
          </FormControl>
        </Stack>
      </Flex>
      <Table variant="simple" bg="white">
        <TableCaption>
          <Stack direction="row" align='center' justify="center">
            <Button variant='ghost' onClick={onPreviousPage} disabled={pageIndex === 0}>Anterior</Button>
            <FormControl as={Stack} spacing={2} direction='row' align='end'>
            <FormLabel>Status</FormLabel>
              <Select w='auto' minW='150px' onChange={(e: any) => onChangeLimit(Number(e.target.value))}>
                <option value="2">2</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </Select>
            </FormControl>
            <Button variant='ghost' onClick={onNextPage} disabled={pageIndex === pages}>Próxima</Button>
          </Stack>
        </TableCaption>
        {loading
          ? <Skeleton width="100%" h="530px" />
          : (
          <>
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
            <Tbody>
              {data?.plips.map((pf: any, index: number) => (
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
          </>
        )}
      </Table>
    </Stack>
  );
}

export default PlipsFormTable;