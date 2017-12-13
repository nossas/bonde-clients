import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'

import '~client/styles/main.scss'

import BackgroundContainer from '~routes/admin/not-authenticated/background.connected'
import CurrentUserContainer from '~routes/admin/authenticated/container'
import { TechnicalIssues } from '~client/components/error/index.js'
import PrivateRoute from '~root/routes-v1/private-route'

import AccountLogin from '~routes/admin/not-authenticated/account-login/page.connected'
import CommunityList from '~routes/admin/authenticated/external/community-list/page.connected'
import MobilizationsList from '~routes/admin/authenticated/sidebar/mobilizations-list/page.connected'

const withBackground = Component => props => (
  <BackgroundContainer {...props}>
    <Component {...props} />
  </BackgroundContainer>
)

const withUser = Component => props => (
  <CurrentUserContainer {...props}>
    <Component {...props} />
  </CurrentUserContainer>
)


import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import * as CommunitySelectors from '~client/community/selectors'
import DNSControlSelectors from '~client/community/dns-control-selectors'
import * as DNSControlActions from '~client/community/action-creators/dns-control'
import SidebarModule from '~client/components/navigation/sidebar'
import { Loading } from '~client/components/await'

const mapStateToSidebarProps = (state, props) => ({
  community: CommunitySelectors.getCurrent(state),
  loading: MobSelectors(state, props).mobilizationsIsLoading(),
  loaded: MobSelectors(state, props).mobilizationsIsLoaded(),
  sidebarProps: SidebarModule.getSidebarProps(state, props),
  dnsControlSelectors: DNSControlSelectors(state)
})
const mapDispatchToSidebarProps = { ...MobActions, ...DNSControlActions }
const withSidebar = Component => connect(mapStateToSidebarProps, mapDispatchToSidebarProps)(
  class SidebarHOC extends React.Component {
    componentDidMount () {
      const promises = []
      const community = this.props.community
      const shouldMakeFetch = community && !this.props.loaded && !this.props.loading

      shouldMakeFetch && promises.push(this.props.asyncFetchMobilizations(community.id))
      !this.props.dnsControlSelectors.dnsHostedZones().isLoaded() && promises.push(
        this.props.asyncFetchHostedZones()
      )
      return Promise.all(promises)
    }

    render () {
      return (
        <div>
          {this.props.loading ? <Loading /> : (
            <SidebarModule.Sidebar {...this.props.sidebarProps}>
              <Component {...this.props} />
            </SidebarModule.Sidebar>
          )}
        </div>
      )
    }
  }
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const AuthExample = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/login" component={withBackground(AccountLogin)} />
        <PrivateRoute exact path="/" component={withUser(MobilizationsList)} />
        <PrivateRoute exact path="/community" component={withUser(CommunityList)} />
        <PrivateRoute exact path="/mobilizations" component={withSidebar(MobilizationsList)} />
        <Route component={TechnicalIssues} />
      </Switch>
    </div>
  </Router>
)

export default AuthExample
