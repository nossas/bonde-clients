import React from 'react'
import { I18n } from 'react-i18next'
import {
  Flexbox,
  IconColorful,
  Title,
  Text
} from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'

export default () => (
  <I18n ns='auth'>
    {(t) => (
      <Flexbox>
        {/* TODO: know, why require use of div here? */}
        <div>
          <IconColorful name='mobilization' size={50} />
        </div>
        <Title.H2>{t('forgetPassword.successfully.title')}</Title.H2>
        <Text>{t('forgetPassword.successfully.checkEmail')}</Text>
        <Text>{t('forgetPassword.successfully.checkSpam')}</Text>
        <ButtonLink to='/auth/login'>{t('forgetPassword.goback')}</ButtonLink>
      </Flexbox>
    )}
  </I18n>
)
