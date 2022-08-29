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
import SignaturesFiltersProvider, {
  useQueryFiltersData,
  useQueryFiltersLimit,
  useQueryFiltersPage,
  useQueryFiltersFields
} from './SignaturesQueryProvider';

interface PlipSignature {
  confirmed_signatures: number
  created_at: string

  plips: {
    name: string
    email: string
    whatsapp: string
    expected_signatures: number
    state: string
    status: string
  }[]
}

const Row: React.FC<{ plipSignature: PlipSignature }> = ({ plipSignature }) => {
  // TODO: verificar assinaturas / fichas com mais de 1 registro
  const plipForm = plipSignature.plips[0]

  return (
    <Tr>
      <Td fontWeight="bold">{plipForm.name}</Td>
      <Td>{plipForm.email}</Td>
      <Td>{plipForm.state}</Td>
      <Td isNumeric>{plipForm.expected_signatures || 0}</Td>
      <Td isNumeric>{plipSignature.confirmed_signatures || 0}</Td>
      <Td >{new Date(plipSignature.created_at).toLocaleDateString()}</Td>
      <Td>{plipForm.whatsapp}</Td>
    </Tr>
  );
}

// const CreatedAtRow: React.FC<any> = ({ activist }) => (
//   <Tr>
//     <Td >{new Date(activist.created_at).toLocaleDateString()}</Td>
//   </Tr>
// );

const SignaturesTable: React.FC<any> = ({ widgetId }) => {
  const { data, loading } = useQueryFiltersData();
  // const { data2, confirmedTotal } = useQueryBFiltersData();
  const { pageIndex, onChangePage, onPreviousPage, onNextPage, pages, total } = useQueryFiltersPage();
  // const { pages, onNextPage } = useQueryBFiltersPage();
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
                {data?.plip_signatures.map((ps: any) => <Row plipSignature={ps} />)}
              </Tbody>
            </>
          )}
      </Table>
    </Stack>
  );
}

const SignaturesTableView: React.FC<{ widgetId: number }> = ({ widgetId }) => {
  return (
    <SignaturesFiltersProvider widgetId={widgetId}>
      <SignaturesTable widgetId={widgetId} />
    </SignaturesFiltersProvider>
  )
};

export default SignaturesTableView;
