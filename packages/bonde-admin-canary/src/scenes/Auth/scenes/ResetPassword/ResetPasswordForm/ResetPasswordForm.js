import React from 'react'
import { Button, Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import { Field, FormGraphQL } from 'components/Form'
import { ButtonLink } from 'components/Link'
import { required, min } from 'services/validations'
import { PasswordField } from '../../components'
import resetPassword from './resetPassword.graphql'

export default ({ t, token, handleSuccess }) => (
  <Flexbox vertical>
    <Title.H2 margin={{ bottom: 20 }}>{t('resetPassword.form.title')}</Title.H2>
    <Title.H4 margin={{ bottom: 15 }}>{t('resetPassword.form.subtitle')}</Title.H4>
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
      <Flexbox horizontal spacing='between'>
        <ButtonLink to='/auth/login'>{t('resetPassword.form.cancel')}</ButtonLink>
        <Button type='submit'>{t('resetPassword.form.submit')}</Button>
      </Flexbox>
    </FormGraphQL>
  </Flexbox>
)
