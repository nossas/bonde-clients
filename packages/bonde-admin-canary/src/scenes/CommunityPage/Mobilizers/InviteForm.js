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
import SelectField from './SelectField'

const Styles = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 10px 20px -7px rgba(0,0,0,0.05);
`

const InlineFormWrap = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${Hint} {
    right: 60px;
  }

  > div {
    flex-grow: 1;
    padding-right: 60px;
  }
`

export const InviteMutation = gql`
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
    <Styles>
      <ConnectedForm
        initialValues={{ role: 2 }}
        onSubmit={async ({ email, role }, form) => {
          const input = {
            community_id: community.id,
            email,
            role
          }
          if (user.isAdmin) {
            input.user_id = user.id
          }

          try {
            const { data } = await invite({ variables: { input } })

            onSuccess(data.insert_invitations.returning)
              .then(() => {
                toast('Convite enviado com sucesso', { type: toast.TYPE.SUCCESS })
                form.reset()
              })
          } catch ({ graphQLErrors, ...errors }) {
            if (graphQLErrors.filter(err => err.extensions.code === 'permission-error').length > 0) {
              toast('Ops! Seu usuário não possui permissão para essa ação, qualquer dúvida entre em contato pelo suporte.', { type: toast.TYPE.ERROR })
            } else {
              console.error({ graphQLErrors, ...errors })
            }
          }
        }}
      >
        {({ submitting }) => (
          <InlineFormWrap>
            <InputField
              name='email'
              label='Enviar convite para'
              placeholder='E-mail de cadastro do mobilizador(a)'
              validate={
                composeValidators(
                  required('Para convidar usuário deve preencher o e-mail'),
                  isEmail('E-mail inválido, confira se está tudo ok')
                )
              }
            />
            <SelectField name='role' label='Função'>
              <option value={1}>Administrador (a)</option>
              <option value={2}>Mobilizador (a)</option>
            </SelectField>
            <Button type='submit' disabled={submitting}>Convidar</Button>
          </InlineFormWrap>
        )}
      </ConnectedForm>
    </Styles>
  )
}

InviteForm.propTypes = {
  onSuccess: PropTypes.func.isRequired
}

export default InviteForm
