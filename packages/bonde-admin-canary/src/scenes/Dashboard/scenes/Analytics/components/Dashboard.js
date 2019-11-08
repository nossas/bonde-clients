import React from 'react'
import {
  Flexbox2 as Flexbox,
  Title,
  Input,
  Button,
  Card
} from 'bonde-styleguide'
import gql from 'graphql-tag'
import { Field } from 'redux-form'
import { MutationForm, FormField } from 'components/Forms'
import { required } from 'services/validations'

const insertPersonMutation = gql`
mutation InsertPerson ($name: String!, $about: String!) {
  insert_canary_person(objects: { name: $name, about: $about }) {
    returning {
      name
      about
    }
  }
}
`

const DefaultComponent = () => (
  <Flexbox vertical>
    <Title.H2>DashboardPage</Title.H2>
    <Card rounded padding={{ x: 30, y: 20 }}>
      <MutationForm
        formId='DashboardForm'
        values={{ name: 'Jonas', about: 'Lorem ipsum' }}
        mutation={insertPersonMutation}
      >
        <Field
          name='name'
          label='Name'
          validate={[required('Name is required.')]}
          component={FormField}
          inputComponent={Input}
          placeholder='Whats your name?'
          type='text'
        />
        <Field
          name='about'
          label='About'
          validate={[required('About is required.')]}
          component={FormField}
          inputComponent={Input}
          placeholder='Talk about you'
          type='text'
        />
        <Button type='submit'>Done!</Button>
      </MutationForm>
    </Card>
  </Flexbox>
)

export default DefaultComponent
