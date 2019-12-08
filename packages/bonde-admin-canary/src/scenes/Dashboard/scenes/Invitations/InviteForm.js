import React from 'react'
import { PropTypes } from 'prop-types'
import gql from 'graphql-tag'
import { Flexbox2 as Flexbox, Input } from 'bonde-styleguide'
import { MutationForm, Field, FormField, SubmitButton } from 'components/Forms'
import { isEmail, required } from 'services/validations'
import { InvitationsQuery } from './InvitationsDataset'

const InviteMutation = gql`
  mutation Invite ($community_id: Int!, $email: String!) {
    insert_invitations (
      objects: { role: 2, community_id: $community_id, email: $email }
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

const InviteForm = ({ community }) => (
  <MutationForm
    cleanForm
    formId={FORM_ID}
    mutation={InviteMutation}
    values={{ community_id: community.id }}
    refetchQueries={[{ query: InvitationsQuery, variables: { community_id: community.id } }]}
  >
    <Flexbox horizontal end>
      <div style={{ flexGrow: 1 }}>
        <Field
          name='email'
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

InviteForm.propTypes = {
  community: PropTypes.object.isRequired
}

export default InviteForm
