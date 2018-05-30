import React from 'react'
import { AuthAPI } from 'services/auth'
import { translate } from 'services/i18n'
import REGISTER from './register.graphql'

import {
  Button,
  Checkbox,
  Flexbox2 as Flexbox,
  FormField,
  Input
} from 'bonde-styleguide'

import { FormGraphQL, Field } from 'components/Form'
import { Link } from 'components'
import { isEmail, isEmpty, min } from 'services/validations'
import { PasswordField } from '../components'

const AuthRegister = ({ t }) => (
  <FormGraphQL
    mutation={REGISTER}
    onSubmit={(values, mutation) => {
      return mutation({
        variables: { user: { data: JSON.stringify(values) } }
      })
      .then(({ data }) => {
        if (data.register && !data.register.jwtToken) {
          return Promise.reject({ formError: 'register is fail.' })
        }
        AuthAPI.login({ jwtToken: data.register.jwtToken })
        return Promise.resolve()
      })
    }}
  >
    <Flexbox colSize='49.1%' spacing='between'>
      <Field
        name='first_name'
        label={t('fields.firstName.label')}
        placeholder={t('fields.firstName.placeholder')}
        component={FormField}
        inputComponent={Input}
        validate={value => isEmpty(value) && t('fields.firstName.errors.isEmpty')}
      />
      <Field
        name='last_name'
        label={t('fields.lastName.label')}
        placeholder={t('fields.lastName.placeholder')}
        component={FormField}
        inputComponent={Input}
        validate={value => isEmpty(value) && t('fields.lastName.errors.isEmpty')}
      />
    </Flexbox>
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
      label={t('fields.password.label')}
      hint={t('fields.password.hint')}
      component={PasswordField}
      validate={value => {
        if (isEmpty(value)) return t('fields.password.errors.isEmptyRegister')
        else if (min(value, 6)) return t('fields.password.errors.min')
      }}
    />
    <Flexbox vertical padding='0 0 24px'>
      <Checkbox>{t('links.stayConnected')}</Checkbox>
    </Flexbox>
    <Flexbox middle spacing='between'>
      <Link
        to='/auth/login'
        title={t('links.iHaveAccount')}
      >
        <Button flat>{t('links.iHaveAccount')}</Button>
      </Link>
      <Button type='submit'>{t('button.submit')}</Button>
    </Flexbox>
  </FormGraphQL>
)

export default translate('auth')(AuthRegister)
