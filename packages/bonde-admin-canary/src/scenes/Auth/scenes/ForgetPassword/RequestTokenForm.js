import React from 'react'
import { I18n } from 'react-i18next'
import {
  Flexbox,
  FormField,
  Input,
  Title,
  Text
} from 'bonde-styleguide'
import { MutationForm, Field, SubmitButton } from 'components/Forms'
import { ButtonLink } from 'components/Link'
import { isEmail } from 'services/validations'
import RequestTokenMutation from './requestResetPasswordToken.graphql'
import PropTypes from 'prop-types'

const RequestTokenForm = ({ onSuccess }) => (
  <I18n ns='auth'>
    {(t, { i18n }) => (
      <Flexbox>
        <Title.H2 margin={{ bottom: 18 }}>{t('forgetPassword.title')}</Title.H2>
        <Text margin={{ bottom: 30 }}>{t('forgetPassword.description')}</Text>
        <MutationForm
          formId='RequestTokenForm'
          mutation={RequestTokenMutation}
          variables={{
            callbackUrl: `${process.env.REACT_APP_DOMAIN_ADMIN_CANARY}/auth/reset-password/`,
            locale: i18n.language === 'pt' ? 'pt-BR' : i18n.language
          }}
          onSuccess={onSuccess}
          onError={({ graphQLErrors }) => {
            if (graphQLErrors && graphQLErrors.length > 0) {
              if (graphQLErrors[0].message === 'user_not_found') {
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject({ fields: { email: t(`forgetPassword.email.notFound`) } })
              } else if (graphQLErrors[0].message === 'template_not_found') {
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject({ fields: { email: t(`forgetPassword.template.notFound`) } })
              }
            }
          }}
        >
          <Field
            label={t('forgetPassword.email.label')}
            name='email'
            placeholder={t('forgetPassword.email.placeholder')}
            component={FormField}
            inputComponent={Input}
            validate={[
              isEmail(t('forgetPassword.email.isEmail'))
            ]}
          />
          <Flexbox padding={{ top: 25 }} horizontal>
            <ButtonLink
              to='/auth/login'
              title={t('forgetPassword.goback')}
            >
              {t('forgetPassword.goback')}
            </ButtonLink>
            <SubmitButton formId='RequestTokenForm'>
              {t('forgetPassword.submit')}
            </SubmitButton>
          </Flexbox>
        </MutationForm>
      </Flexbox>
    )}
  </I18n>
)

RequestTokenForm.propTypes = {
  onSuccess: PropTypes.func
}

export default RequestTokenForm
