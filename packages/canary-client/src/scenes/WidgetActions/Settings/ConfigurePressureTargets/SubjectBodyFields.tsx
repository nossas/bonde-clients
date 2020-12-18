import React from 'react';
import { InputField, TextareaField } from 'bonde-components';
import { useTranslation } from 'react-i18next';

type SubjectBodyFieldsProps = {
  prefix?: string
}

const targetsFormart = (value: any) => {
  return value && typeof value !== 'string' ? value.join(';') : value;
}

const targetsParse = (value: any) => {
  return value.split(';');
}

const SubjectBodyFields = ({ prefix }: SubjectBodyFieldsProps) => {
  const { t } = useTranslation('widgetActions');

  return (
    <>
      <InputField
        name={prefix ? prefix + ".targets" : "targets"}
        placeholder={t('settings.pressure.placeholder.targets')}
        label={t('settings.pressure.label.targets')}
        format={targetsFormart}
        parse={targetsParse}
      />
      <InputField
        name={prefix ? prefix + ".email_subject" : "email_subject"}
        placeholder={t('settings.pressure.placeholder.email_subject')}
        label={t('settings.pressure.label.email_subject')}
      />
      <TextareaField
        name={prefix ? prefix + ".email_body" : "email_body"}
        placeholder={t('settings.pressure.placeholder.email_body')}
        label={t('settings.pressure.label.email_body')}
      />
    </>
  );
}

export default SubjectBodyFields;