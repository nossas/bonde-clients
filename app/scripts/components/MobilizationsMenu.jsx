import React from 'react'
import { Link, Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../Paths'
import * as AuthActions from './../actions/AuthActions'

@reactMixin.decorate(Navigation)
export default class MobilizationMenu extends React.Component {
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
      </div>
    )
  }
}
