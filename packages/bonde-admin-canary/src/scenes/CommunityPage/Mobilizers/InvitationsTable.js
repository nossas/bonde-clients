import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'bonde-components'
import moment from 'moment'
import Table, { Styles } from './Table'
import Role from './Role'
import Resend from './Resend'

import 'moment/locale/pt-br'

const Expired = (refetch) => ({ row: { original: data } }) => {
  const relative = moment(data.expires)
    .locale('pt-br')
    .endOf('day')
    .fromNow()

  if (relative.indexOf('há') > -1) {
    return <Resend data={data} refetch={refetch} />
  }
  return relative
}

const Timestamp = ({ row: { original } }) => {
  return moment(original.created_at)
    .locale('pt-br')
    .format('DD/MM/YYYY')
}

function App ({ data: defaultData, refetch }) {
  // { "user_id": 152, "created_at": "2020-01-08T12:17:44.304143", "role": 2, "email": "diego@dorgam.com.br", "expired": true, "expires": "2020-01-11T00:00:00", "__typename": "invitations" }
  const columns = React.useMemo(
    () => [
      {
        Header: <Header.h5>Email</Header.h5>,
        accessor: 'email',
        minWidth: 350
      },
      {
        Header: <Header.h5>Função</Header.h5>,
        accessor: 'role',
        width: 100,
        Cell: Role
      },
      {
        Header: <Header.h5>Enviado por</Header.h5>,
        accessor: 'user.email',
        minWidth: 300
      },
      {
        Header: <Header.h5>Data de envio</Header.h5>,
        accessor: 'created_at',
        minWidth: 100,
        width: 200,
        Cell: Timestamp
      },
      {
        Header: <Header.h5>Expira em</Header.h5>,
        accessor: 'expires',
        minWidth: 100,
        Cell: Expired(refetch)
      }
    ],
    [refetch]
  )

  return (
    <Styles height="500px">
      <Table columns={columns} data={defaultData} />
    </Styles>
  )
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  refetch: PropTypes.func
}

export default App
