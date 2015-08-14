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
    const { user, mobilization } = this.props
    const style = { minWidth: "300px" }
    return(
      <div style={style} className="bg-gray p2 white">
        <div>
          <span>{user.first_name} {user.last_name} (
            <a className="btn white" style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={::this.handleLogout}>Sair</a>)
          </span>
        </div>
        <div>
          <h4 className="silver caps muted">Mobilização</h4>
          <Link to={Paths.editMobilization(mobilization.id)} className="white">{mobilization.name}</Link>
          <h4 className="silver caps muted">Construção da página</h4>
          <Link to={Paths.newMobilizationBlock(mobilization.id)} className="silver caps">+ Conteúdo</Link>
        </div>
      </div>
    )
  }
}
