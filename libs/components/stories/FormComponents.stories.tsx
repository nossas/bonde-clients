import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import {
  RoundSelect,
  RoundSelectField,
  Form,
  Button,
  RoundInput,
  RoundInputField,
} from '@';
import { Form as FinalForm } from 'react-final-form';

const Layout = styled.div<{ bg?: string }>`
  width: 350px;
  padding: 20px 10px;
  background-color: ${props => props.bg || '#fff'};
`;

export const select = () => {
  const dicio = [
    {
      value: 'desabilitada',
      label: 'Desabilitada',
    },
    {
      value: 'aprovada',
      label: 'Aprovada',
    },
  ];
  return (
    <Layout>
      <RoundSelect
        options={dicio}
        name="availability"
        placeholder="Disponibilidade"
        isClearable
        onChange={e => action('onChange')(e.value)}
      />
    </Layout>
  );
};

select.story = {
  name: 'Select',
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const submit = async values => {
  await sleep(1000);
  action('submit')(values);

  return {};
};

export const selectField = () => {
  const dicio = [
    {
      value: 'desabilitada',
      label: 'Desabilitada',
    },
    {
      value: 'aprovada',
      label: 'Aprovada',
    },
  ];
  return (
    <FinalForm onSubmit={submit}>
      {({ handleSubmit, submitting }) => (
        <Form onSubmit={handleSubmit}>
          <RoundSelectField
            options={dicio}
            name="availability"
            isClearable={true}
            onChange={e => action('onChange')(e)}
            // placeholder="Disponibilidade"
          />
          <RoundInputField name="search" placeholder="Buscar" />
          <Button type="submit" disabled={submitting}>
            Submit
          </Button>
        </Form>
      )}
    </FinalForm>
  );
};

selectField.story = {
  name: 'Select Field',
};

export const input = () => {
  return (
    <Layout>
      <RoundInput border placeholder="Buscar nome, email, especialidade..." />
    </Layout>
  );
};

input.story = {
  name: 'Input',
};

export default {
  title: 'FormComponents',
};
