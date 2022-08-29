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
} from './SignaturesQueryProvider';

import BCreatedAtFilterProvider, {
  useQueryBFiltersData,
  useQueryBFiltersPage
} from './CreatedAtProvider';

const Row: React.FC<any> = ({ activist }) => (
  <Tr>
    <Td fontWeight="bold">{activist.name}</Td>
    <Td>{activist.email}</Td>
    <Td>{activist.state}</Td>
    <Td isNumeric>{activist.expected_signatures || 0}</Td>
    <Td isNumeric>{activist.confirmed_signatures || 0}</Td>
    <Td >{new Date(activist.created_at).toLocaleDateString()}</Td>
    <Td>{activist.whatsapp}</Td>
  </Tr>
);

const CreatedAtRow: React.FC<any> = ({ activist }) => (
  <Tr>
    <Td >{new Date(activist.created_at).toLocaleDateString()}</Td>
  </Tr>
);

const SignaturesTable: React.FC<any> = ({ widgetId }) => {
  const { data, loading } = useQueryFiltersData();
  const { data2, confirmedTotal } = useQueryBFiltersData();
  const { pageIndex, onChangePage, onPreviousPage } = useQueryFiltersPage();
  const { pages, onNextPage } = useQueryBFiltersPage();
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
        Fichas entregues ({confirmedTotal})
      </Heading>
      <Flex direction='row' justify="space-between" align='end'>
        <Stack direction='row' spacing={4}>
          <EmailFilter />
          <ExpectedSignaturesFilter onChange={onChangeSignatures} />
          <StateFilter onChange={onChangeStates} />
        </Stack>
        <ExportCSV widgetId={widgetId} fileName="relatorio-plips" />
      </Flex>
      <Table variant="simple" bg="white" maxH="500px">
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
                  <Th isNumeric>Assinaturas esperadas</Th>
                  <Th isNumeric>Assinaturas entregues</Th>
                  <Th>Data Registro</Th>
                  <Th>Whatsapp</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.plips.map((pf: any) => <Row activist={pf} />)}
                {data2?.plip_signatures.map((pf: any) => pf.plips?.map((pf2: any) => <CreatedAtRow activist={pf2} />))}
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
      <BCreatedAtFilterProvider widgetId={widgetId}>

        <SignaturesTable widgetId={widgetId} />

      </BCreatedAtFilterProvider>
    </QueryFiltersProvider>
  )
};

export default SignaturesTableView;
