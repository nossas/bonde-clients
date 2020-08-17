import React from 'react';
import { toast } from 'react-toastify';
import { Header, Link, Icon } from 'bonde-components';
import styled from 'styled-components';
import { useMutation, gql } from 'bonde-core-tools';
import Table, { Styles } from './Table';
import Role from './Role';
import DeleteException from './DeleteException';

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
`;

const MenuStyles = styled.div`
  a {
    font-weight: bold;
  }
`;

type Row = {
  original: any
}

type DeleteProps = {
  row: Row
  refetch: any
}

const Delete = ({ row: { original: { id, user } }, refetch }: DeleteProps) => {
  const [deleteCommunityUsers] = useMutation(DeleteCommunityUsersMutation);

  return (
    <MenuStyles>
      <Link
        href="#"
        onClick={async () => {
          try {
            const { data } = await deleteCommunityUsers({ variables: { id } })
            if (data.delete_community_users.returning.length > 0) {
              toast(`${user.first_name} removido com sucesso.`, { type: toast.TYPE.SUCCESS })
              return await refetch()
            }
            throw DeleteException({
              graphQLErrors: [{ extensions: { code: 'validation-failed' } }]
            })
          } catch ({ graphQLErrors, ...errors }) {
            if (graphQLErrors && graphQLErrors.filter((err: any) => err.extensions.code === 'validation-failed').length > 0) {
              toast('Ops! Seu usuário não possui permissão para essa ação, qualquer dúvida entre em contato pelo suporte.', { type: toast.TYPE.ERROR })
            } else {
              console.error({ graphQLErrors, ...errors })
            }
          }
        }}
      >
        <Icon name='Trash' size='small' /> Excluir
      </Link>
    </MenuStyles>
  );
};

const createDeleteButton = (refetch: any) => (props: any) => <Delete {...props} refetch={refetch} />;

type Props = {
  data: any[]
  refetch: any
}

function UsersTable({ data: defaultData, refetch }: Props) {
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

export default UsersTable;