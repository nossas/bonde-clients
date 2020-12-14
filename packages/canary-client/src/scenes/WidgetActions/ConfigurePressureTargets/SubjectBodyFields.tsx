import React from 'react';
import { InputField, TextareaField } from 'bonde-components';

type SubjectBodyFieldsProps = {
  prefix?: string
}

const SubjectBodyFields = ({ prefix }: SubjectBodyFieldsProps) => (
  <>
    <InputField
      name={prefix ? prefix + ".targets" : "targets"}
      placeholder="Nome do alvo <nome@alvo.org>"
      label="Nome e e-mail dos alvos"
    />
    <InputField
      name={prefix ? prefix + ".email_subject" : "email_subject"}
      placeholder="Escreva um assunto"
      label="Assunto do e-mail para os alvos"
    />
    <TextareaField
      name={prefix ? prefix + ".email_body" : "email_body"}
      placeholder="Escreva aqui o email..."
      label="Corpo do e-mail para os alvos"
    />
  </>
);

export default SubjectBodyFields;