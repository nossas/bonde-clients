import React from 'react'
import { Button, Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import { Field, FormGraphQL } from 'components/Form'
import { ButtonLink } from 'components/Link'
import { required, min } from 'services/validations'
import { PasswordField } from '../../components'
import resetPassword from './resetPassword.graphql'

export default ({ t, token, handleSuccess }) => (
  <Flexbox vertical>
    <Title.H2>{t('resetPassword.form.title')}</Title.H2>
    <Title.H4>{t('resetPassword.form.subtitle')}</Title.H4>
    <FormGraphQL
      mutation={resetPassword}
      onSubmit={(values, mutation) => {
        return mutation({
          variables: {
            newPassword: values.password,
            token
          }
        })
        .then(handleSuccess)
      }}
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
      <ButtonLink to='/auth/login'>{t('resetPassword.form.cancel')}</ButtonLink>
      <Button type='submit'>{t('resetPassword.form.submit')}</Button>
    </FormGraphQL>
  </Flexbox>
)
