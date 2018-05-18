import React from 'react'
import {
  Flexbox2 as Flexbox,
  Tag, Title, Button, Icon
} from 'bonde-styleguide'

import { PageAdmin } from '../../../../components'
import { translate, Interpolate } from '../../../../services/i18n'

const classes = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 675,
    textAlign: 'center',
  }
}

const tags = [
  { label: 'Meio Ambiente', value: 'meio-ambiente' },
  { label: 'Direitos Humanos', value: 'direitos-humanos' },
  { label: 'Segurança pública', value: 'seguranca-publica' },
  { label: 'Mobilidade', value: 'mobilidade' },
  { label: 'Direito das Mulheres', value: 'direito-das-mulheres' },
  { label: 'Feminismo', value: 'feminismo' },
  { label: 'Participação Social', value: 'participacao-social' },
  { label: 'Educação', value: 'educacao' },
  { label: 'Transparência', value: 'transparencia' },
  { label: 'Direito LGBTQI+', value: 'direito-lgbtqi' },
  { label: 'Direito à Moradia', value: 'direito-a-moradia' },
  { label: 'Combate à Corrupção', value: 'combate-a-corrupcao' },
  { label: 'Combate ao Racismo', value: 'combate-ao-racismo' },
  { label: 'Saúde Pública', value: 'saude-publica' },
]

const AuthTags = ({ t }) => (
  <PageAdmin noActionButtons>
    <div style={classes.container}>
      <div style={classes.flex}>
        <Title.H2 margin={{ bottom: 25 }} fontSize={44}>
          {t('greetings', { name: 'Maria' })}
        </Title.H2>
        <Title.H4 margin={{ bottom: 60 }} fontWeight='normal' align='center'>
          <Interpolate i18nKey="auth.tags:explanation" br={<br />} />
        </Title.H4>
        <form>
          {tags.map(({ label, value }) => <Tag text={label} value={value} />)}
          <Flexbox horizontal spacing='between' margin={{ top: 55 }}>
            <Button flat>
              <Icon name='plus' size={7} />
              {t('add')}
            </Button>
            <Button disabled>{t('ok')}</Button>
          </Flexbox>
        </form>
      </div>
    </div>
  </PageAdmin>
)

export default translate('auth.tags')(AuthTags)
