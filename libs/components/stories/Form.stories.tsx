import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  Button,
  ConnectedForm,
  Form,
  InputField,
  Validators,
  TextareaField,
  SelectField
} from '@';
import { Form as FinalForm } from 'react-final-form';
import styled from 'styled-components';

interface ContainerProps {
  between?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  ${props => props.between && `justify-content: space-between;`}
  ${props =>
    !props.between &&
    `
    & > div {
      flex-grow: 1;
      margin-right: 20px;

      &:last-child {
        margin: 0;
      }
    }
  `}
`;

Container.defaultProps = {
  between: false,
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const submit = async values => {
  await sleep(1000);
  action('submit')(values);

  return {}
};

const { required, composeValidators, isEmail, min } = Validators;

export const form = () => (
  <FinalForm onSubmit={submit}>
    {({ handleSubmit, submitting }) => (
      <Form onSubmit={handleSubmit}>
        <Container>
          <InputField
            label="First name"
            name="firstName"
            validate={required('Required')}
          />
          <InputField label="Last name" name="lastName" />
        </Container>
        <InputField
          label="E-mail"
          name="email"
          type="email"
          validate={required('Required')}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          validate={required('Required')}
        />
        <SelectField
          label="Favorite color"
          name="color"
        >
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
        </SelectField>
        <TextareaField
          label="Mensagem"
          name="message"
          validate={required('Required')}
        />
        <Container between>
          <Button dark onClick={action('forget password')}>
            Reset my password
          </Button>
          <Button type="submit" disabled={submitting}>
            Submit
          </Button>
        </Container>
      </Form>
    )}
  </FinalForm>
);

export const connectedForm = () => (
  <ConnectedForm onSubmit={submit} initialValues={{ fullname: 'Jonas' }}>
    {({ submitting, form }) => {
      return (
        <>
          <InputField label="Full Name" name="fullname" />
          <InputField label="City" name="city" validate={(value: any) => !value ? 'Error!' : null} />
          <Container>
            <Button dark onClick={form.reset}>
              Clean
            </Button>
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </Container>
        </>
      );
    }}
  </ConnectedForm>
);

export const initialValues = () => (
  <ConnectedForm onSubmit={submit} initialValues={{ city: 'Belo Horizonte' }}>
    {({ submitting, form }) => {
      return (
        <>
          <InputField label="Full Name" name="fullname" />
          <InputField label="City" name="city" />
          <Container>
            <Button dark onClick={form.reset}>
              Clean
            </Button>
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </Container>
        </>
      );
    }}
  </ConnectedForm>
);

export const validators = () => (
  <ConnectedForm onSubmit={submit}>
    {({ submitting }) => (
      <>
        <InputField
          label="E-mail (Required)"
          name="email"
          validate={composeValidators(
            required('Required'),
            isEmail('Invalid email')
          )}
        />
        <InputField
          label="Password (Min. 6)"
          name="password"
          type="password"
          validate={min(6, 'Password should be > 6')}
        />
        <Container>
          <Button dark onClick={action('forget password')}>
            Reset my password
          </Button>
          <Button type="submit" disabled={submitting}>
            Submit
          </Button>
        </Container>
      </>
    )}
  </ConnectedForm>
);

export default {
  title: 'Form',
};
