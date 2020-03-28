import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Button,
  ConnectedForm,
  InputField
} from 'bonde-components'

const InlineFormWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 13px;

  > div {
    flex-grow: 1;
    padding-right: 60px;
  }
`

const InviteForm = ({ onSubmit }) =>
  <ConnectedForm onSubmit={onSubmit}>
    {({ submitting }) => (
      <InlineFormWrap>
        <InputField
          name='email'
          label='Email'
          placeholder='Insira aqui o e-mail de cadastro de quem quiser convidar'
        />
        <Button type='submit' disabled={submitting}>Convidar</Button>
      </InlineFormWrap>
    )}
  </ConnectedForm>

InviteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default InviteForm
