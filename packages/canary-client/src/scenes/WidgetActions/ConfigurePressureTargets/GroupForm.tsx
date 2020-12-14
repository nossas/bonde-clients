import React, { useState, useEffect } from 'react';
import { Button, Icon, InputField, Label, Text } from 'bonde-components';
import styled from 'styled-components';
import { css } from 'styled-components/macro';
import { FieldArray } from 'react-final-form-arrays';
import SubjectBodyFields from './SubjectBodyFields';

const ButtonStyled = styled(Button).attrs({ type: 'button' })`
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 18px;
  justify-content: flex-start;
`;

const IconButton = styled.button.attrs({ type: 'button' })`
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  background: none;
`;

const GroupField = ({ name, group, remove, status }: any) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (status === 'unrender') setOpen(false);
  }, [status]);

  return group && !open ? (
    <div
      css={css`
        display: flex;
        align-items: center;
        border: 1px solid #eee;
        border-radius: 2px;
        margin-bottom: 10px;
        padding: 20px 18px;

        ${IconButton} {
          margin-left: 10px;
        }
      `}
    >
      <Text color='#000' style={{ flexGrow: 1 }}>{group.name}</Text>
      <IconButton onClick={() => setOpen(true)}>
        <Icon name='Pencil' size='small' />
      </IconButton>
      <IconButton onClick={remove}>
        <Icon name='Trash' size='small' />
      </IconButton>
    </div>
  ) : (
      <div
        css={css`
          margin: 15px 0;
          border: 1px solid #eee;
          padding: 20px 18px;
        `}
      >
        <InputField
          name={`${name}.name`}
          label="Nome do grupo de alvos"
          placeholder="Ex. Rio de Janeiro"
        />
        <SubjectBodyFields prefix={name} />
        <Button type='button' onClick={() => setOpen(false)}>Salvar</Button>
      </div>
    );
}

export type GroupFormProps = {
  form: {
    mutators: {
      push: any
      pop: any
    }
  }
}

const GroupForm = ({ form: { mutators } }: GroupFormProps) => {
  // This effect used to resolve when an GroupField open for
  // first time, the inputs pattern must closed.
  const [status, setStatus] = useState('unrender');

  useEffect(() => {
    setStatus('render');
  }, [])

  // Render
  return (
    <>
      <InputField
        name='select_label'
        label='Nome do campo de seleção'
        placeholder='Ex: Selecione seu estado'
      />
      <div
        css={css`
          margin-bottom: 15px;

          ${Label} {
            display: block;
            margin-bottom: 8px;
          }
        `}
      >
        <Label>Adicionar grupo de alvos</Label>
        <FieldArray name="groups">
          {({ fields }) =>
            fields.map((name, index) => (
              <GroupField
                key={name}
                name={name}
                status={status}
                group={fields.value[index]}
                remove={() => fields.remove(index)}
              />
            ))
          }
        </FieldArray>
        <ButtonStyled
          secondary
          onClick={() => mutators.push('groups', undefined)}
        >
          {`+ ADD GRUPO DE ALVOS`}
        </ButtonStyled>
      </div>
    </>
  );
}

export default GroupForm;