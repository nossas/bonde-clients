import React from 'react'
import { I18n } from 'react-i18next'
import {
  Button,
  Flexbox,
  FormField,
  Input,
  Title,
  Text
} from 'bonde-styleguide'
import { FormGraphQL, Field } from 'components/Form'
import { ButtonLink } from 'components/Link'
import RequestTokenMutation from './requestResetPasswordToken.graphql'

export default () => (
  <I18n ns='auth'>
  {(t) => (
    <Flexbox>
      <Title.H2>{t('forgetPassword.title')}</Title.H2>
      <Text>{t('forgetPassword.description')}</Text>
      <FormGraphQL
        mutation={RequestTokenMutation}
        onSubmit={(values, mutation) => {
          console.log('[onSubmit]', values)
          return mutation({
            variables: {
              data: JSON.stringify(values)
            }
          })
          .then(() => {
            console.log('[CHANGESTATE]', 'success')
            return Promise.resolve()
          })
        }}
      >
        <Field
          label={t('forgetPassword.email.label')}
          name='email'
          placeholder={t('forgetPassword.email.placeholder')}
          component={FormField}
          inputComponent={Input}
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
