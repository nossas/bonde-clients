import React from 'react';
import { InputField } from 'bonde-components';
import CommunityForm from '../BaseForm';
import Panel from '../Panel';

const SettingsPage = () => {
  return (
    <CommunityForm>
      <Panel>
        <InputField
          name='community.name'
          label='Nome'
          placeholder='Insira o nome da sua comunidade'
        />
        <InputField
          name='community.description'
          label='Descrição'
          placeholder='Insira uma descrição para a sua comunidade'
        />
        <InputField
          name='community.city'
          label='Cidade'
        />
        <InputField
          name='community.email_template_from'
          label='E-mail de resposta para notificações'
          placeholder='Ex: Nome do remetente <remetente@provedor.com>'
        />
      </Panel>
    </CommunityForm>
  );
}

// TODO:
// - Translate
// - Validate
// - Hint
// - UploadField

export default SettingsPage;
