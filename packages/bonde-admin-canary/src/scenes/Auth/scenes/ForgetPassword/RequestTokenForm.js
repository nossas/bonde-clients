import React from 'react'
import { I18n } from 'react-i18next'
import {
  Button,
  Flexbox,
  FormField,
  Input,
  Title
} from 'bonde-styleguide'
import { FormGraphQL, Field } from 'components/Form'
import { ButtonLink } from 'components/Link'
import { isEmail, required } from 'services/validations'
import RequestTokenMutation from './requestResetPasswordToken.graphql'

export default ({ onSuccess }) => (
  <I18n ns='auth'>
  {(t) => (
    <Flexbox>
      <Title.H2 margin={{ bottom: 20 }}>{t('forgetPassword.title')}</Title.H2>
      <Title.H4 margin={{ bottom: 25 }}>{t('forgetPassword.description')}</Title.H4>
      <FormGraphQL
        mutation={RequestTokenMutation}
        onSubmit={(values, mutation) => {
          return mutation({
            variables: {
              data: JSON.stringify(values)
            }
          })
          .then(() => {
            onSuccess && onSuccess()
            return Promise.resolve()
          })
          .catch(({ graphQLErrors }) => {
            if (graphQLErrors && graphQLErrors.length > 0) {
              if (graphQLErrors[0].message === 'user_not_found') {
                return Promise.reject({ fields: { email: t(`forgetPassword.email.notFound`) }})
              }
            }
          })
        }}
      >
        <Field
          label={t('forgetPassword.email.label')}
          name='email'
          placeholder={t('forgetPassword.email.placeholder')}
          component={FormField}
          inputComponent={Input}
          validate={[
            required(t('forgetPassword.email.isEmpty')),
            isEmail(t('forgetPassword.email.isEmail'))
          ]}
        />
        <Flexbox horizontal>
          <ButtonLink
            to='/auth/login'
            title={t('forgetPassword.goback')}
          >
            {t('forgetPassword.goback')}
          </ButtonLink>
          <Button type='submit'>
            {t('forgetPassword.submit')}
          </Button>
        </Flexbox>
      </FormGraphQL>
    </Flexbox>
  )}
  </I18n>
)
