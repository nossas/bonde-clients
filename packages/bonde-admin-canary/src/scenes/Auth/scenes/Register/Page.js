import React from 'react'
import PropTypes from 'prop-types'
import { authSession } from 'services/auth'
import { translate } from 'services/i18n'
import RegisterUserQuery from './register.graphql'
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

const AuthRegister = ({ t, match }) => {
  const { params: { code } } = match
  return (
    <React.Fragment>
      <Spacing margin={{ bottom: 37 }}>
        <Title.H1>{t('welcome')}</Title.H1>
      </Spacing>
      <MutationForm
        formId={FORM_ID}
        values={{ input: { invitation_code: code } }}
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

AuthRegister.propTypes = {
  t: PropTypes.func.isRequired,
  match: PropTypes.any
}

export default translate('auth')(AuthRegister)
