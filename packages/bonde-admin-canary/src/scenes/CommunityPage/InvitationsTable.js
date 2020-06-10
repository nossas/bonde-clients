import React from 'react'
import PropTypes from 'prop-types'
import { Header, Button } from 'bonde-components'
import moment from 'moment'
import Table, { Styles } from './Table'

const Expired = ({ data }) => {
  moment.locale()
  const relative = moment(data.expires).endOf('day').fromNow();
  if (relative.indexOf('ago') > -1) {
    return <Button dark type='button'>Reenviar</Button>
  }
  return relative;
}

function App({ data: defaultData }) {
  // { "user_id": 152, "created_at": "2020-01-08T12:17:44.304143", "role": 2, "email": "diego@dorgam.com.br", "expired": true, "expires": "2020-01-11T00:00:00", "__typename": "invitations" }
  const columns = React.useMemo(
    () => [
      {
        Header: <Header.h5>Solicitante</Header.h5>,
        accessor: 'user.email',
        minWidth: 350
      },
      {
        Header: <Header.h5>Função</Header.h5>,
        accessor: 'role',
        width: 100,
        Cell: ({ row: { original } }) =>
          original.role === 2 ? 'Mobilizador(a)' : 'Administrador'
      },
      {
        Header: <Header.h5>Convidado</Header.h5>,
        accessor: 'email',
        minWidth: 350
      },
      {
        Header: <Header.h5>Data de envio</Header.h5>,
        accessor: 'created_at',
        minWidth: 100,
        width: 200,
        Cell: ({ row: { original } }) => new Date(original.created_at).toISOString().slice(0, 10)
      },
      {
        Header: <Header.h5>Expira em</Header.h5>,
        accessor: 'expires',
        minWidth: 100,
        Cell: ({ row: { original } }) => {
          return <Expired data={original} />
        }
      }
    ],
    []
  )

  return (
    <Styles height="500px">
      <Table columns={columns} data={defaultData} />
    </Styles>
  )
}

App.propTypes = {
  data: PropTypes.array.isRequired
}

export default App