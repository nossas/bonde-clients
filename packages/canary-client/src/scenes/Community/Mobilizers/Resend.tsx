import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'bonde-components';
import { useMutation, useSession, gql } from 'bonde-core-tools';
import styled from 'styled-components';
import { InviteMutation } from './InviteForm';
import DeleteException from './DeleteException';

const DeleteInviteMutation = gql`
  mutation DeleteInvite($id: Int!) {
    delete_invitations(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

const Styles = styled.div`
  a {
    font-weight: bold;
  }
`;

type Invite = {
  id: Number
  email: string
  role: string | number
}

type Props = {
  data: Invite,
  refetch: any
}

const Resend = ({ data: { id, email, role }, refetch }: Props) => {
  const [deleteInvite] = useMutation(DeleteInviteMutation)
  const [createInvite] = useMutation(InviteMutation)

  const { user, community } = useSession()

  const onClick = async () => {
    try {
      if (!!community) {
        const { data } = await deleteInvite({ variables: { id } })

        if (data.delete_invitations.returning.length > 0) {
          const input: any = {
            community_id: community.id,
            email,
            role
          };

          if (user.isAdmin) {
            input.user_id = user.id;
          }

          await createInvite({ variables: { input } });

          await refetch();

          return toast('Convite reenviado com sucesso', { type: toast.TYPE.SUCCESS });
        }
        throw DeleteException({
          graphQLErrors: [{ extensions: { code: 'validation-failed' } }]
        });
      } else {
        console.log('Community Not Found!');
      }
    } catch ({ graphQLErrors, ...errors }) {
      if (graphQLErrors && graphQLErrors.filter((err: any) => err.extensions.code === 'validation-failed').length > 0) {
        toast('Ops! Seu usuário não possui permissão para essa ação, qualquer dúvida entre em contato pelo suporte.', { type: toast.TYPE.ERROR });
      } else {
        console.error({ graphQLErrors, ...errors });
      }
    }
  }

  return (
    <Styles>
      <Link href="#" onClick={onClick}>Reenviar</Link>
    </Styles>
  );
};

export default Resend;