import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { Tabs, Tab } from '../../../components/Navigation'
import { SettingsPageMenuLayout, SettingsPageContentLayout } from '../../../components/Layout'
import {
  FormRedux,
  SubmitButton,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField
} from '../../Dashboard/Forms'

class EditUserPage extends Component {

  render() {
    const { fields: { picture, first_name, last_name, email }, ...formProps } = this.props

    return (
      <div>
        <SettingsPageMenuLayout title="Minha conta">
          <Tabs>
            <Tab
              text="Usuário"
              isActive={true}
            />
          </Tabs>
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout>
          <FormRedux
            nosubmit
            onSubmit={values => console.log(values)}
            {...formProps}>
            <FormGroup controlId="pictureId" {...picture}>
              <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
            </FormGroup>
            <FormGroup controlId="firstNameId" {...first_name}>
              <ControlLabel>Nome</ControlLabel>
              <FormControl type="text" />
            </FormGroup>
            <FormGroup controlId="lastNameId" {...last_name}>
              <ControlLabel>Sobrenome</ControlLabel>
              <FormControl type="text" />
            </FormGroup>
            <FormGroup controlId="emailId" {...email}>
              <ControlLabel>E-mail</ControlLabel>
              <FormControl type="email" />
            </FormGroup>
            <SubmitButton position="floatTopRight">Salvar</SubmitButton>
          </FormRedux>
        </SettingsPageContentLayout>
      </div>
    )
  }
}

EditUserPage.propTypes = {
  // Injected by RequireLogin.js
  auth: PropTypes.object.isRequired
}

const fields = ['picture', 'first_name', 'last_name', 'email']

export default reduxForm({
  form: 'editUserForm',
  fields
}, (state, ownProps) => ({
  initialValues: state.auth.user,
}))(EditUserPage)
