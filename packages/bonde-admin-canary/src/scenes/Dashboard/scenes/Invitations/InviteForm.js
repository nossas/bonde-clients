import React from 'react'
import { PropTypes } from 'prop-types'
import gql from 'graphql-tag'
import urljoin from 'url-join'
import { Flexbox2 as Flexbox, Input } from 'bonde-styleguide'
import { MutationForm, Field, FormField, SubmitButton } from 'components/Forms'
import { Auth } from 'services/auth'
import { isEmail, required } from 'services/validations'
import { InvitationsQuery } from './InvitationsDataset'

const InviteMutation = gql`
  mutation Invite ($input: invitations_insert_input!) {
    insert_invitations (
      objects: [$input]
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

const FORM_ID = 'InviteForm'

const InviteForm = ({ community }) => {
  const input = {
    role: 2,
    community_id: community.id,
    callback_url: urljoin(process.env.REACT_APP_DOMAIN_ADMIN_CANARY, '/auth/register')
  }

  return (
    <Auth>
      {({ user }) => {
      // TO admin users user_id not set default with X-HASURA-USER-ID
        if (user.admin) {
          input.user_id = user.id
        }

        return (
          <MutationForm
            cleanForm
            formId={FORM_ID}
            mutation={InviteMutation}
            values={{ input }}
            refetchQueries={[{ query: InvitationsQuery, variables: { community_id: community.id } }]}
          >
            <Flexbox horizontal end>
              <div style={{ flexGrow: 1 }}>
                <Field
                  name='input.email'
                  label='Enviar convite para:'
                  placeholder='Insira aqui o e-mail de cadastro de quem quiser convidar'
                  component={FormField}
                  inputComponent={Input}
                  validade={[
                    required('required field'),
                    isEmail('invalid email')
                  ]}
                />
              </div>
              <SubmitButton formId={FORM_ID}>Convidar</SubmitButton>
            </Flexbox>
          </MutationForm>
        )
      }}
    </Auth>
  )
}

InviteForm.propTypes = {
  community: PropTypes.object.isRequired
}

export default InviteForm
