import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import styled from 'styled-components'
import {
  Button,
  ConnectedForm,
  InputField,
  Validators,
  Hint
} from 'bonde-components'
import { toast } from 'react-toastify'
import { useMutation, useSession } from 'bonde-core-tools'

const InlineFormWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 13px;

  ${Hint} {
    right: 60px;
  }
  > div {
    flex-grow: 1;
    padding-right: 60px;
  }
`

const InviteMutation = gql`
  mutation Invite ($input: [invitations_insert_input!]!) {
    insert_invitations (
      objects: $input
    ) {
      returning {
        id
        community {
          id
          name
        }
        user_id
        created_at
        updated_at
        expired
      }
    }
  }
`

const InviteForm = ({ onSuccess }) => {
  const [invite] = useMutation(InviteMutation)
  const { user, community } = useSession()
  const { composeValidators, required, isEmail } = Validators

  return (
    <ConnectedForm
      onSubmit={async ({ email }, form) => {
        const input = {
          user_id: user.id,
          community_id: community.id,
          email,
          // default role to mobilizers
          role: 2,
          callback_url: ''
        }

        const { data } = await invite({ variables: { input } })
        onSuccess(data.insert_invitations.returning)
          .then(() => {
            form.reset()
            toast('Convite enviado com sucesso', { type: toast.TYPE.SUCCESS })
          })
      }}
    >
      {({ submitting }) => (
        <InlineFormWrap>
          <InputField
            name='email'
            label='Email'
            placeholder='Insira aqui o e-mail de cadastro de quem quiser convidar'
            validate={
              composeValidators(
                required('Para convidar usuário deve preencher o e-mail'),
                isEmail('E-mail inválido, confira se está tudo ok')
              )
            }
          />
          <Button type='submit' disabled={submitting}>Convidar</Button>
        </InlineFormWrap>
      )}
    </ConnectedForm>
  )
}

InviteForm.propTypes = {
  onSuccess: PropTypes.func.isRequired
}

export default InviteForm
