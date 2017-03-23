import React, { PropTypes } from 'react'
import { Tabs, Tab } from '~client/components/navigation'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/components/layout'
import {
  FormRedux,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  SuccessMessage
} from '~client/components/forms'
import { FloatLayout } from '~client/components/grids'
import * as Paths from '~client/paths'

const EditUserPage = ({
  fields: {
    avatar,
    first_name: firstName,
    last_name: lastName,
    email
  },
  ...formProps
}) => (
  <SettingsPageLayout>
    <SettingsPageMenuLayout title='Minha conta'>
      <Tabs>
        <Tab text='Usuário' path={Paths.editAccount()} isActive />
      </Tabs>
    </SettingsPageMenuLayout>
    <SettingsPageContentLayout>
      {/* TODO: Change FormRedux to be transparent by default */}
      <FormRedux
        nosubmit
        className='transparent'
        successMessage='Dados atualizados com sucesso.'
        {...formProps}
      >
        <FormGroup controlId='avatarId' {...avatar}>
          <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
        </FormGroup>
        <FormGroup controlId='firstNameId' {...firstName}>
          <ControlLabel>Nome</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='lastNameId' {...lastName}>
          <ControlLabel>Sobrenome</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='emailId' {...email}>
          <ControlLabel>E-mail</ControlLabel>
          <FormControl type='email' />
        </FormGroup>

        <FloatLayout position='floatTopRight'>
          <Button type='submit' className='btn white caps p2 bg-pagenta'>Salvar</Button>
          <SuccessMessage text='Dados editados com sucesso.' />
        </FloatLayout>
      </FormRedux>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

EditUserPage.propTypes = {
  // Injected by react-redux
  submit: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired
}

export default EditUserPage
