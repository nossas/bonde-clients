import React from 'react'
import { Link, Navigation } from 'react-router'
import { DropDownMenu, DropDownMenuItem } from './'
import reactMixin from 'react-mixin'
import * as Paths from '../Paths'
import * as AuthActions from './../actions/AuthActions'

@reactMixin.decorate(Navigation)

export default class TopMenu extends React.Component {
  handleLogout() {
    this.props.dispatch(AuthActions.logout())
      .fail((state) => this.setState({ auth: state }))
      .always(() => this.transitionTo(Paths.login()))
  }

  renderUserMenu() {
    const { user } = this.props
    if(user) {
      return (
        <div className="clearfix">
          <DropDownMenu className="mt1 mr4" menuClassName="bg-aqua white" icon="user">
            <DropDownMenuItem href={'/#'+ Paths.newMobilization()}><i className="fa fa-plus" style={{marginRight: '6px'}} /> Nova mobilização</DropDownMenuItem>
            <DropDownMenuItem href={'/#'+ Paths.mobilizations()}><i className="fa fa-flag-o" style={{marginRight: '2px'}} /> Suas mobilizações</DropDownMenuItem>
            <DropDownMenuItem onClick={::this.handleLogout}><i className="fa fa-sign-out" style={{marginRight: '3px'}} /> Sair</DropDownMenuItem>
          </DropDownMenu>
        </div>
      )
    }
  }

  render() {
    return(
      <div className="clearfix flex flex-stretch bg-aqua px4">
        <Link to="/" className="left h3 button button-transparent white p2">mobilize</Link>
        { this.renderUserMenu() }
      </div>
    )
  }
}
