import React from 'react';
import { InputField, TextareaField } from 'bonde-components';
import { useTranslation } from 'react-i18next';

type SubjectBodyFieldsProps = {
  prefix?: string
  emailSubjectName?: string
  emailBodyName?: string
}

const targetsFormart = (value: any) => {
  return value && typeof value !== 'string' ? value.join(';') : value;
}

const targetsParse = (value: any) => {
  return value.split(';');
}

const SubjectBodyFields = ({ prefix, emailSubjectName, emailBodyName }: SubjectBodyFieldsProps) => {
  const { t } = useTranslation('widgetActions');

  const emailSubject = emailSubjectName ? emailSubjectName : 'pressure_subject';
  const emailBody = emailBodyName ? emailBodyName : 'pressure_body';

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
        name={prefix ? prefix + `.${emailSubject}` : emailSubject}
        placeholder={t('settings.pressure.placeholder.email_subject')}
        label={t('settings.pressure.label.email_subject')}
      />
      <TextareaField
        name={prefix ? prefix + `.${emailBody}` : emailBody}
        placeholder={t('settings.pressure.placeholder.email_body')}
        label={t('settings.pressure.label.email_body')}
      />
    </>
  );
}

export default SubjectBodyFields;