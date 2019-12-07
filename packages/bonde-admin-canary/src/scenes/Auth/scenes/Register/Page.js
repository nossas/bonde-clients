import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { graphqlApi } from 'services/graphql'
import { useMutation } from '@apollo/react-hooks'
import { authSession } from 'services/auth'
import { translate } from 'services/i18n'
import { Redirect } from 'services/router'
import RegisterUserQuery from './register.graphql'
import AcceptInviteMutation from './acceptInvite.graphql'
import {
  Flexbox2 as Flexbox,
  Input,
  Title,
  Spacing
} from 'bonde-styleguide'
import {
  MutationForm,
  Field,
  FormField,
  SubmitButton
} from 'components/Forms'
import { ButtonLink } from 'components/Link'
import { isEmail, required, min } from 'services/validations'
import { PasswordField } from '../components'

const FORM_ID = 'RegisterUserForm'

const AuthRegister = ({ t, location }) => {
  const { email, code } = queryString.parse(location.search)
  const [acceptInvite, { data, loading, error }] = useMutation(AcceptInviteMutation, { client: graphqlApi })

  if (!data && !loading && !error) acceptInvite({ variables: { code, email } })

  if (loading) return <p>Carregando convite</p>

  if (error) {
    if (error.message.replace('GraphQL error: ', '') === 'invalid_invitation_code') {
      return <p>Invalid Invitation Code</p>
    }
    return <p>Error</p>
  }

  if (data && data.accept_invite.is_new_user) {
    return (
      <React.Fragment>
        <Spacing margin={{ bottom: 37 }}>
          <Title.H1>{t('welcome')}</Title.H1>
        </Spacing>
        <MutationForm
          formId={FORM_ID}
          values={{ input: { invitation_code: code, email: data.accept_invite.email } }}
          mutation={RegisterUserQuery}
          onSuccess={({ data: { register } }) => {
            return authSession
              .login({ jwtToken: register.token })
              .then(() => {
                window.location.href = '/admin'
              })
          }}
        >
          <Flexbox colSize='49.1%' spacing='between'>
            <Field
              name='input.first_name'
              label={t('fields.firstName.label')}
              placeholder={t('fields.firstName.placeholder')}
              component={FormField}
              inputComponent={Input}
              validate={required(t('fields.firstName.errors.isEmpty'))}
            />
            <Field
              name='input.last_name'
              label={t('fields.lastName.label')}
              placeholder={t('fields.lastName.placeholder')}
              component={FormField}
              inputComponent={Input}
              validate={required(t('fields.lastName.errors.isEmpty'))}
            />
          </Flexbox>
          <Field
            disabled
            name='input.email'
            label={t('fields.email.label')}
            placeholder={t('fields.email.placeholder')}
            component={FormField}
            inputComponent={Input}
            validate={[
              required(t('fields.email.errors.isEmpty')),
              isEmail(t('fields.email.errors.isEmail'))
            ]}
          />
          <Field
            name='input.password'
            label={t('fields.password.label')}
            hint={t('fields.password.hint')}
            component={PasswordField}
            validate={[
              required(t('fields.password.errors.isEmptyRegister')),
              min(6, t('fields.password.errors.min'))
            ]}
          />
          <Flexbox middle spacing='between'>
            <ButtonLink
              flat
              to='/auth/login'
              title={t('links.iHaveAccount')}
            >
              {t('links.iHaveAccount')}
            </ButtonLink>
            <SubmitButton title={t('button.submit')} formId={FORM_ID}>{t('button.submit')}</SubmitButton>
          </Flexbox>
        </MutationForm>
      </React.Fragment>
    )
  }
  return <Redirect to='/' />
}

AuthRegister.propTypes = {
  t: PropTypes.func.isRequired,
  location: PropTypes.any
}

export default translate('auth')(AuthRegister)
