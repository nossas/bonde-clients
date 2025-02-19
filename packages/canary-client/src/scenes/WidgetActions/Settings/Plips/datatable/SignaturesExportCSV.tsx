import React, { useEffect } from 'react';
import { gql, useLazyQuery } from 'bonde-core-tools';
import { createVariables, useQueryFiltersFields } from './SignaturesQueryProvider';
import { Button } from 'bonde-components/chakra';

export const QUERY = gql`
    query ($where: plip_signatures_bool_exp) {
    plip_signatures(
      where: $where
      order_by: {created_at: desc}
    ) {
      confirmed_signatures
      created_at
      state
      plips {
        name: form_data(path: "name")
        email: form_data(path: "email")
        whatsapp: form_data(path: "whatsapp")
        expected_signatures
        state
        status
      }
    }
  }
`;

interface Props {
  widgetId: number;
  fileName: string;
}

// json to CSV
const jsonToCSV = (data): string => {
  const rows: any = [];

  rows.push('', 'Nome', 'E-mail', 'Estado', 'Assinaturas Entregues', 'Data Registro', 'Whatsapp', 'Status', '\n')
  data.forEach((activist) => {
    const deliveryDate = new Date(activist.created_at)
    const formattedDate = (deliveryDate.getDate()) + "/" + (deliveryDate.getMonth() + 1) + "/" + deliveryDate.getFullYear();
    rows.push(activist.plips[0].name, activist.plips[0].email, activist.state, activist.confirmed_signatures, formattedDate, activist.plips[0].whatsapp, activist.plips[0].status, '\n')
  })
  return "data:text/csv;charset=utf-8," +
    rows;
}

const SignaturesExportCSV: React.FC<Props> = ({ widgetId, fileName }) => {
  const { states, signatures } = useQueryFiltersFields();
  const [fetchConfirmedSignatures, { called, loading, data }] = useLazyQuery(QUERY, {
    variables: createVariables({ widgetId, states, signatures })
  });

  useEffect(() => {
    if (called && !loading && data) {
      const encodedUri = encodeURI(jsonToCSV(data.plip_signatures));
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${fileName}.csv`);
      document.body.appendChild(link); // Required for FF

      link.click();
    }
  }, [called, loading, data, fileName]);

  return (
    <Button variant="outline" colorScheme="gray" onClick={fetchConfirmedSignatures} disabled={called && loading}>
      {called && loading ? 'Exportando CSV...' : 'Exportar'}
    </Button>
  );
}

export default SignaturesExportCSV;
