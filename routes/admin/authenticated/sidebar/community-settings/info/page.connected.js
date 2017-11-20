import React from 'react'
import { createForm, Field } from '~client/storybook/forms'
import {
  SettingsForm,
  TextField,
  UploadField
} from '~client/storybook/settings/forms'
import { asyncEdit } from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import { isValidFromEmail } from '~client/utils/validation-helper'

const CommunityForm = createForm({
  name: 'communityInfoForm',
  fields: [
    'id', 'image', 'name', 'city', 'description', 'email_template_from'
  ],
  initialValues: (state) => ({
    ...CommunitySelectors.getCurrent(state) || {}
  }),
  validate: (values, ownProps) => {
    const { name, city, email_template_from: customFromEmail } = values
    const errors = {}

    if (!name) {
      errors.name = {
        id: 'page--community-info.form.name.validation.required',
        defaultMessage: 'Informe o nome da comunidade'
      }
    }
    if (!city) {
      errors.city = {
        id: 'page--community-info.form.city.validation.required',
        defaultMessage: 'Informe em qual cidade sua comunidade atua'
      }
    }
    if (customFromEmail && !isValidFromEmail(customFromEmail)) {
      errors.email_template_from = {
        id: 'page--community-info.form.custom-from-email.validation.invalid-email-format',
        defaultMessage: 'E-mail de resposta fora do formato padrão'
      }
    }
    return errors
  },
  submit: asyncEdit,
  component: SettingsForm
})

const I18N = {
  successMessage: {
    id: 'page--community-info.form.successMessage',
    defaultMessage: 'Informações básicas inseridas com sucesso'
  },
  fields: {
    image: {
      label: {
        id: 'page--community-info.form.logo.label',
        defaultMessage: 'Logo'
      }
    },
    name: {
      label: {
        id: 'page--community-info.form.name.label',
        defaultMessage: 'Nome'
      },
      placeholder: {
        id: 'page--community-info.form.name.placeholder',
        defaultMessage: 'Insira o nome da sua comunidade'
      }
    },
    description: {
      label: {
        id: 'page--community-info.form.description.label',
        defaultMessage: 'Descrição'
      },
      placeholder: {
        id: 'page--community-info.form.description.placeholder',
        defaultMessage: 'Insira uma descrição para a sua comunidade'
      }
    },
    city: {
      label: {
        id: 'page--community-info.form.city.label',
        defaultMessage: 'Cidade'
      }
    },
    email_template_from: {
      label: {
        id: 'page--community-info.form.custom-from-email.label',
        defaultMessage: 'E-mail de resposta para notificações'
      },
      placeholder: {
        id: 'page--community-info.form.custom-from-email.placeholder',
        defaultMessage: 'Ex: Nome do remetente <remetente@provedor.com>'
      },
      helpText: {
        id: 'page--community-info.form.custom-from-email.helper-text',
        defaultMessage: 'Esse email é utilizado como remetente padrão das notificações.'
      }
    }
  }
}

export default () => (
  <CommunityForm i18nContext={I18N}>
    <Field
      name='image'
      signingUrl={`${process.env.API_URL}/uploads`}
      component={UploadField}
    />
    <Field name='name' component={TextField} />
    <Field name='description' component={TextField} />
    <Field name='city' component={TextField} />
    <Field name='email_template_from' component={TextField} />
  </CommunityForm>
)
