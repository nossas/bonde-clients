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

  render(){
    const { user } = this.props
    const style = { minWidth: "300px" }
    return(
      <div style={style} className="bg-gray p2 white">
        <h6 className="silver caps muted">Mobilizações</h6>
        <Link
          to={Paths.newMobilization()}
          className="silver button button-transparent full-width">
          <i className="fa fa-plus mr2" />
          Nova mobilização
        </Link>
        <Link
          to={Paths.mobilizations()}
          className="silver button button-transparent full-width">
          <i className="fa fa-flag-o mr2" />
          Suas mobilizações
        </Link>
        <h6 className="silver caps muted">Perfil</h6>
        <a className="silver button button-transparent full-width" onClick={::this.handleLogout}>
          <i className="fa fa-sign-out mr2" />
          {user.first_name} {user.last_name} (Sair)
        </a>
      </div>
    )
  }
}
