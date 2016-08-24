import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { Label, CloseButton } from '../../components'

import * as Paths from '../../Paths'
import * as MobilizationActions from '../MobilizationActions'
import * as Selectors from '../MobilizationSelectors'


class MobilizationCustomDomainPage extends React.Component {

  render() {
    const { fields: { custom_domain }, handleSubmit, submitting, error } = this.props
    const { mobilization, credentials, edit, ...props } = this.props

    return (
      <div className="py3 px3 col col-8">
        <p className="h5">Você pode personalizar o endereço da sua mobilização caso já tenha um domínio. Preencha o campo abaixo e clique em Salvar.</p>
        <form onSubmit={handleSubmit((values, dispatch) => dispatch(edit(credentials, { ...mobilization, ...values })))}>
          <div className='mb1'>
            <Label>Domínio personalizado</Label>
          </div>
          <input
            type='text'
            className='field-light mr1'
            style={{ width: '250px' }}
            placeholder='www.meudominio.com.br'
            {...custom_domain}
          />
          <input
            type="submit"
            className="caps button bg-aqua h3 p2"
            disabled={submitting || !props.dirty}
            value={submitting ? "Salvando..." : 'Salvar'}
          />
          {custom_domain.error && custom_domain.touched && <span className="red block">{custom_domain.error}</span>}
        </form>
        <p><strong>Atenção</strong>: você ainda precisa configurar o seu domínio no servidor de registro para que ele seja redirecionado para a página da sua mobilização. Para isso, utilize as informações abaixo.</p>
        <table>
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Dados</th>
            </tr>
            <tr>
              <td><code>{custom_domain.value}</code></td>
              <td><code>CNAME</code></td>
              <td><code>{mobilization.slug}.reboo.org</code></td>
            </tr>
          </tbody>
        </table>
        <CloseButton dirty={props.dirty} path={Paths.editMobilization(mobilization.id)} />
      </div>
    )
  }
}

MobilizationCustomDomainPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,

  credentials: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
}

const fields = ['custom_domain']

const validate = values => {
  const errors = {}
  const regex = /^(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  if (values.custom_domain && !regex.test(values.custom_domain)) {
    errors.custom_domain = 'Informe um domínio válido'
  }
  return errors
}

export default reduxForm({
  form: 'mobilizationForm',
  fields,
  validate
},
(state, ownProps) => {
  const mobilization = Selectors.getMobilization(state, ownProps)
  return {
    mobilization: mobilization,
    initialValues: mobilization || {},
    credentials: state.auth.credentials
  }
}, { ...MobilizationActions })(MobilizationCustomDomainPage)
