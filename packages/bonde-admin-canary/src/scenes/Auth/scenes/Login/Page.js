import React from 'react'
import { AuthAPI } from '../../../../services/auth'
import { translate } from '../../../../services/i18n'
import AUTHENTICATE from './authenticate.graphql'

import {
  Button,
  Checkbox,
  Flexbox2 as Flexbox,
  FormField,
  Input
} from 'bonde-styleguide'

import { FormGraphQL, Field } from '../../../../components/Form'
import { Link } from '../../../../components'
import { isEmail, isEmpty } from '../../../../services/validations'
import { PasswordField } from '../components'

const AuthLogin = ({ t }) => (
  <FormGraphQL
    mutation={AUTHENTICATE}
    onSubmit={(values, mutation) => {
      return mutation({ variables: values })
        .then(({ data }) => {
          if (data.authenticate && !data.authenticate.jwtToken) {
            return Promise.reject({
              formError: t('form.authError')
            })
          }
          AuthAPI
            .login({ jwtToken: data.authenticate.jwtToken })
          return Promise.resolve()
        })
    }}
  >
    <Field
      name='email'
      label={t('fields.email.label')}
      placeholder={t('fields.email.placeholder')}
      component={FormField}
      inputComponent={Input}
      validate={(value) => {
        if (isEmpty(value)) return t('fields.email.errors.isEmpty')
        else if (!isEmail(value)) return t('fields.email.errors.isEmail')
      }}
    />
    <Field
      name='password'
      placeholder={t('fields.password.placeholder')}
      label={t('fields.password.label')}
      component={PasswordField}
      validate={value => isEmpty(value) && t('fields.password.errors.isEmptyLogin')}
    />
    <Flexbox spacing='between' padding='0 0 24px'>
      <Checkbox>{t('links.stayConnected')}</Checkbox>
    </Flexbox>
    <Flexbox middle spacing='between'>
      <Link
        to='/auth/register'
        title={t('links.register')}
      >
        <Button flat>{t('links.register')}</Button>
      </Link>
      <Button type='submit' title={t('button.submit')}>
        {t('button.submit')}
      </Button>
    </Flexbox>
  </FormGraphQL>
)

export default translate('auth')(AuthLogin)
