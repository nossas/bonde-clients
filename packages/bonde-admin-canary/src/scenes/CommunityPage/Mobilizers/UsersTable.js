import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Header, Button, Icon } from 'bonde-components'
import { useMutation } from 'bonde-core-tools'
import gql from 'graphql-tag'
import Table, { Styles } from './Table'
import Role from './Role'
import DeleteException from './DeleteException'

const DeleteCommunityUsersMutation = gql`
  mutation DeleteCommunityUsers($id: Int!) {
    delete_community_users(where: { id: { _eq: $id } }) {
      returning {
        id
        user {
          first_name
        }
      }
    }
  }
`

const Delete = ({ row: { original: { id, user } }, refetch }) => {
  const [deleteCommunityUsers] = useMutation(DeleteCommunityUsersMutation)

  return (
    <Button
      dark
      type='button'
      onClick={async () => {
        try {
          const { data } = await deleteCommunityUsers({ variables: { id } })
          if (data.delete_community_users.returning.length > 0) {
            toast(`${user.first_name} removido com sucesso.`, { type: toast.TYPE.SUCCESS })
            return await refetch()
          }
          throw new DeleteException({
            graphQLErrors: [{ extensions: { code: 'validation-failed' } }]
          })
        } catch ({ graphQLErrors, ...errors }) {
          if (graphQLErrors && graphQLErrors.filter(err => err.extensions.code === 'validation-failed').length > 0) {
            toast('Ops! Seu usuário não possui permissão para essa ação, qualquer dúvida entre em contato pelo suporte.', { type: toast.TYPE.ERROR })
          } else {
            console.error({ graphQLErrors, ...errors })
          }
        }
      }}
    >
      <Icon name='Close' size='small' /> Remover
    </Button>
  )
}

Delete.propTypes = {
  row: PropTypes.any.isRequired,
  refetch: PropTypes.func
}

const createDeleteButton = (refetch) => (props) => <Delete {...props} refetch={refetch} />

function UsersTable ({ data: defaultData, refetch }) {
  const columns = React.useMemo(
    () => [
      {
        Header: <Header.h5>Nome</Header.h5>,
        accessor: 'user.first_name',
        minWidth: 350
      },
      {
        Header: <Header.h5>Email</Header.h5>,
        accessor: 'user.email',
        minWidth: 350
      },
      {
        Header: <Header.h5>Função</Header.h5>,
        accessor: 'role',
        width: 100,
        Cell: Role
      },
      {
        Header: <Header.h5>Ações</Header.h5>,
        accessor: 'id',
        minWidth: 100,
        Cell: createDeleteButton(refetch)
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

UsersTable.propTypes = {
  data: PropTypes.array.isRequired,
  refetch: PropTypes.func
}

export default UsersTable
