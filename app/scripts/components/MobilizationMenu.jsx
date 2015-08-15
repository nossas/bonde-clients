import React from 'react'
import { Link, Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../Paths'
import * as AuthActions from './../actions/AuthActions'

@reactMixin.decorate(Navigation)
export default class MobilizationMenu extends React.Component {
  handleLogout(event) {
    event.preventDefault()
    this.props.dispatch(AuthActions.logout())
      .fail((state) => this.setState({ auth: state }))
      .always(() => this.transitionTo('/'))
  }

  handleBlankTarget(event) {
    event.preventDefault()
    window.open(this.makeHref(event.currentTarget.getAttribute('href')))
  }

  render(){
    const { user, mobilization } = this.props
    const style = { minWidth: "300px" }
    return(
      <div style={style} className="bg-gray p2 white">
        <div className="flex flex-center mb3">
          <div className="flex-auto">
            <Link
              to={Paths.editMobilization(mobilization.id)}
              className="silver h5 bold">
              {mobilization.name}
            </Link>
          </div>
          <Link
            to={Paths.configMobilization(mobilization.id)}
            className="silver h3">
            <i className="fa fa-cog" />
          </Link>
        </div>
        <h6 className="silver caps muted">Edição da página</h6>
        <Link
          to={Paths.newMobilizationBlock(mobilization.id)}
          className="silver button button-transparent full-width">
          <i className="fa fa-plus mr2" />
          Bloco de conteúdo
        </Link>
        <h6 className="silver caps muted">Visualização da página</h6>
        <a
          href={Paths.showMobilization(mobilization.id)}
          className="silver button button-transparent full-width" target="_blank" onClick={::this.handleBlankTarget}>
          <i className="fa fa-external-link mr2" />
          Ver em uma nova aba
        </a>
        <h6 className="silver caps muted">Perfil</h6>
        <a className="silver button button-transparent full-width" onClick={::this.handleLogout}>
          <i className="fa fa-sign-out mr2" />
          {user.first_name} {user.last_name} (Sair)
        </a>
      </div>
    )
  }
}
