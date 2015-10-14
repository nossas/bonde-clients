import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { DropDownMenu, DropDownMenuItem } from './../'
import * as Paths from '../../Paths'

export default class TopMenu extends React.Component {
  static propTypes = {
    auth: PropTypes.object
  }

  renderUserMenu() {
    const { user } = this.props.auth
    if (user) {
      return (
        <div className="clearfix">
          <DropDownMenu className="mr4" menuClassName="bg-topMenu white" icon="user">
            <DropDownMenuItem href={Paths.newMobilization()}>
              <i className="fa fa-plus" style={{marginRight: '6px'}} />
              Nova mobilização
            </DropDownMenuItem>
            <DropDownMenuItem href={Paths.mobilizations()}>
              <i className="fa fa-flag-o" style={{marginRight: '2px'}} />
              Suas mobilizações
            </DropDownMenuItem>
            <DropDownMenuItem href={Paths.logout()}>
              <i className="fa fa-sign-out" style={{marginRight: '3px'}} />
              Sair
            </DropDownMenuItem>
          </DropDownMenu>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="topMenu clearfix flex flex-center px4 bg-topMenu">
        <Link
          to="/"
          className="reboo-logo mt2">
        </Link>
        <i className="fa fa-ellipsis-v py2 lightGray"></i>
        { this.renderUserMenu() }
      </div>
    )
  }
}
