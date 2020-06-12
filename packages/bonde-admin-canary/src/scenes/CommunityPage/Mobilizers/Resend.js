import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Link } from 'bonde-components'
import gql from 'graphql-tag'
import { useMutation, useSession } from 'bonde-core-tools'
import styled from 'styled-components'
import { InviteMutation } from './InviteForm'
import DeleteException from './DeleteException'

const DeleteInviteMutation = gql`
  mutation DeleteInvite($id: Int!) {
    delete_invitations(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

const Styles = styled.div`
  a {
    font-weight: bold;
  }
`

const Resend = ({ data: { id, email, role }, refetch }) => {
  const [deleteInvite] = useMutation(DeleteInviteMutation)
  const [createInvite] = useMutation(InviteMutation)

  const { user, community } = useSession()

  const onClick = async () => {
    try {
      const { data } = await deleteInvite({ variables: { id } })

      if (data.delete_invitations.returning.length > 0) {
        const input = {
          community_id: community.id,
          email,
          role
        }
        if (user.isAdmin) {
          input.user_id = user.id
        }
        await createInvite({ variables: { input } })

        await refetch()

        return toast('Convite reenviado com sucesso', { type: toast.TYPE.SUCCESS })
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
  }

  return (
    <Styles>
      <Link href="#" onClick={onClick}>Reenviar</Link>
    </Styles>
  )
}

Resend.propTypes = {
  data: PropTypes.any.isRequired,
  refetch: PropTypes.func
}

export default Resend
