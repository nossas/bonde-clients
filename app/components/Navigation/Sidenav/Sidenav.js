import React, { Component } from 'react'

import * as Paths from '../../../scripts/Paths'

import './sidenav.scss'

class Sidenav extends Component {
  render() {
    const { user } = this.props
    return (
      <nav className="sidenav clearfix">
        <div className="logo-icon"></div>
        <ul className="items list-reset center clearfix mr2">
          <li className="item my-account">
            <i className="item-icon fa fa-user white" />
            <div className="item-content left-align">
              <div>Minha Conta</div>
              <div className="white h6 mb2">{user.email}</div>
              <a href={Paths.logout()} className="caps">Sair</a>
            </div>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Sidenav
