import React from 'react'
import { Button, Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import { Field, Form } from 'components/Form'
import { ButtonLink } from 'components/Link'
import { PasswordField } from '../components'

export default ({ t }) => (
  <Flexbox vertical>
    <Title.H2>{t('resetPassword.form.title')}</Title.H2>
    <Title.H4>{t('resetPassword.form.subtitle')}</Title.H4>
    <Form onSubmit={() => {}}>
      <Field
        name='password'
        label={t('resetPassword.fields.password.label')}
        component={PasswordField}
      />
      <ButtonLink to='/auth/login'>{t('resetPassword.form.cancel')}</ButtonLink>
      <Button type='submit'>{t('resetPassword.form.submit')}</Button>
    </Form>
  </Flexbox>
)
