import React from 'react'
import { Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import { Field, MutationForm, SubmitButton } from 'components/Forms'
import { ButtonLink } from 'components/Link'
import { required, min } from 'services/validations'
import { PasswordField } from '../../components'
import resetPassword from './resetPassword.graphql'
import PropTypes from 'prop-types'

const ResetPasswordForm = ({ t, token, handleSuccess }) => (
  <Flexbox vertical>
    <Title.H2 margin={{ bottom: 18 }}>{t('resetPassword.form.title')}</Title.H2>
    <Title.H4 margin={{ bottom: 30 }}>{t('resetPassword.form.subtitle')}</Title.H4>
    <MutationForm
      mutation={resetPassword}
      variables={{ token }}
      onSuccess={handleSuccess}
    >
      <Field
        name='password'
        label={t('resetPassword.fields.password.label')}
        hint={t('resetPassword.fields.password.hint')}
        component={PasswordField}
        validate={[
          required(t('resetPassword.fields.password.required')),
          min(6, t('resetPassword.fields.password.min6'))
        ]}
      />
      <Flexbox padding={{ top: 25 }} horizontal spacing='between'>
        <ButtonLink to='/auth/login'>{t('resetPassword.form.cancel')}</ButtonLink>
        <SubmitButton>{t('resetPassword.form.submit')}</SubmitButton>
      </Flexbox>
    </MutationForm>
  </Flexbox>
)

ResetPasswordForm.propTypes = {
  t: PropTypes.func,
  token: PropTypes.string,
  handleSuccess: PropTypes.func
}

export default ResetPasswordForm
