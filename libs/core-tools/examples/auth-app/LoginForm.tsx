import * as React from 'react';
import { Header, Main, Body, Button } from 'bonde-components';
import gql from 'graphql-tag';
import { useLocation } from "react-router-dom";
import { useMutation, useSession } from '../../.';

const LoginMutation = gql`
  mutation authenticate($email: String!, $password: String!){
    authenticate(email: $email, password: $password) {
      valid
      token
    }
  }
`

const FormStyles = {
  display: 'flex',
  flexDirection: 'column'
}

const LoginForm = () => {
  let email, password
  const [authenticate, { data }] = useMutation(LoginMutation)
  const { login } = useSession()
  const { search } = useLocation()

  if (!!data) {
    login(data.authenticate)
      .then(() => {
        const urlParams = new URLSearchParams(search)
        const nextUrl = urlParams.get('next')
        // URL default
        window.location.href = nextUrl ? nextUrl : 'http://app.bonde.devel:8181';
      })
  }

  return (
    <Main>
      <Body>
        <Header.h2>Login Form</Header.h2>
        <form
          style={FormStyles}
          onSubmit={(e) => {
            e.preventDefault()
            const variables = { email: email.value, password: password.value }
            authenticate({ variables })
          }}
        >
          <input ref={n => email = n} type='text' name='email' placeholder='Email' />
          <input ref={n => password = n} type='password' name='password' placeholder='Password' />
          <div>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Body>
    </Main>
  )
}

export default LoginForm