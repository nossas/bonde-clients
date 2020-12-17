import React from 'react';
import { Hint, InputField, useField, FormField, Label } from 'bonde-components';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import Panel from '../../../../components/Panel';
import SettingsForm from '../SettingsForm';

const InputHint = styled.div`
  position: relative;
  margin: 0 0 15px;

  ${Hint} {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;

const ColorField = ({ name, label }: any) => {
  const { input } = useField(name);

  return (
    <FormField>
      <Label>{label}</Label>
      <div style={{ padding: '8px 0' }}>
        <SketchPicker
          color={input.value}
          onChangeComplete={(color: any) => input.onChange(color.hex)}
        />
      </div>
    </FormField>
  );
}

const AdjustsFields = ({ widget }: any) => {

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: widget.settings
      }}
    >
      {() => (
        <Panel>
          <InputField
            name='settings.call_to_action'
            label='Título do formulário'
            placeholder='Ex: Preencha o formulário abaixo para assinar o formulário'
          />
          <InputField
            name='settings.button_text'
            label='Botão'
            placeholder='Defina o texto do botão de confirmação do formulário'
          />
          <InputHint>
            <InputField
              name='settings.count_text'
              label='Contador'
              placeholder='Defina o valor que ficará ao lado do número de pessoas que agiram'
            />
            <Hint>O contador será mostrado se existir um texto</Hint>
          </InputHint>
          <InputHint>
            <ColorField
              name='settings.main_color'
              label='Cor padrão'
            />
            <Hint>Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE</Hint>
          </InputHint>
        </Panel>
      )}
    </SettingsForm>
  );
}

export default AdjustsFields;