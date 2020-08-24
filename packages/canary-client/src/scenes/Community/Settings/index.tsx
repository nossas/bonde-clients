import React from 'react';
import { InputField } from 'bonde-components';
import { useTranslation } from "react-i18next";
import CommunityForm from '../BaseForm';
import Panel from '../Panel';

const SettingsPage = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm>
      <Panel>
        <InputField
          name='community.name'
          label={t('info.form.fields.name.label')}
          placeholder={t('info.form.fields.name.placeholder')}
        />
        <InputField
          name='community.description'
          label={t('info.form.fields.description.label')}
          placeholder={t('info.form.fields.description.placeholder')}
        />
        <InputField
          name='community.city'
          label={t('info.form.fields.city.label')}
        />
        <InputField
          name='community.email_template_from'
          label={t('info.form.fields.email_template_from.label')}
          placeholder={t('info.form.fields.email_template_from.placeholder')}
        />
      </Panel>
    </CommunityForm>
  );
}

// TODO:
// - Validate
// - Hint
// - UploadField

export default SettingsPage;
