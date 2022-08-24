import React from 'react';
import {
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
  Heading
} from 'bonde-components/chakra';
import EmailFilter from './EmailFilter';
import ExpectedSignaturesFilter from './ExpectedSignaturesFilter';
import ExportCSV from './ExportCSV';
import Pagination from './Pagination';
import StateFilter from './StatesFilter';
import QueryFiltersProvider, {
  useQueryFiltersData,
  useQueryFiltersLimit,
  useQueryFiltersPage,
  useQueryFiltersFields
} from './QueryFiltersProvider';

const SignaturesTable: React.FC<any> = ({ widgetId }) => {
  const { data, total, loading } = useQueryFiltersData();
  const { pages, pageIndex, onChangePage, onNextPage, onPreviousPage } = useQueryFiltersPage();
  const { onChangeLimit } = useQueryFiltersLimit();
  const { onChangeSignatures, onChangeStates } = useQueryFiltersFields();

  return (
    <Stack spacing={4}>
      <Heading
        as="h5"
        size="xs"
        fontWeight="normal"
        color="gray.400"
        textTransform="uppercase"
      >
        Fichas entregues ({total})
      </Heading>
      <Flex direction='row' justify="space-between" align='end'>
        <Stack direction='row' spacing={4}>
          <EmailFilter />
          <ExpectedSignaturesFilter onChange={onChangeSignatures} />
          <StateFilter onChange={onChangeStates} />
        </Stack>
        <ExportCSV widgetId={widgetId} fileName="relatorio-plips" />
      </Flex>
      <Table variant="simple" bg="white">
        <TableCaption>
          <Pagination
            loading={loading}
            onChangePage={onChangePage}
            onChangeLimit={onChangeLimit}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            pageIndex={pageIndex}
            pages={pages}
          />
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
                  <Th>Data Registro</Th>
                  <Th>Whatsapp</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{data?.plip_signatures.name}</Td>
                  <Td>{data?.plip_signatures.email}</Td>
                  <Td>{data?.plip_signatures.state}</Td>
                  <Td>{data?.plip_signatures.confirmed_signatures}</Td>
                  <Td>{data?.plip_signatures.created_at}</Td>
                  <Td>{data?.plip_signatures.whatsapp}</Td>
                </Tr>
              </Tbody>
            </>
          )}
      </Table>
    </Stack>
  );
}

const SignaturesTableView: React.FC<{ widgetId: number }> = ({ widgetId }) => {
  return (
    <QueryFiltersProvider widgetId={widgetId}>

      <SignaturesTable widgetId={widgetId} />

    </QueryFiltersProvider>
  )
};

export default SignaturesTableView;
