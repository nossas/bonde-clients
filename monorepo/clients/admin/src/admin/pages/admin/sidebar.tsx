
import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import * as DNSControlActions from "../../community/action-creators/dns-control"
import DNSControlSelectors from "../../community/dns-control-selectors"
import * as CommunitySelectors from "../../community/selectors"
import { Loading } from "../../components/await"
import SidebarAPI from "../../components/navigation/sidebar"
import * as MobActions from "../../mobrender/redux/action-creators"
// Actions and Selectors
import MobSelectors from "../../mobrender/redux/selectors"
import AccountPage from './account/edit'
// SubRoutes
import CommunitySettings from './communities/settings'
import MobilizationsContainer from './mobilizations'

class SubRoute extends React.Component {
  async componentDidMount() {
    const promises = []
    const {
      community,
      loaded,
      loading,
      asyncFetchMobilizations,
      dnsControlSelectors: { dnsHostedZones },
      asyncFetchHostedZones
    } = this.props

    community && !loaded && !loading && promises.push(asyncFetchMobilizations(community.id))
    !dnsHostedZones().isLoaded() && promises.push(asyncFetchHostedZones())
    return Promise.all(promises)
  }

  render() {
    const { community, loaded, loading } = this.props
    const isLoading = community && !loaded && !loading
    return isLoading ? <Loading /> : (
      <SidebarAPI.Sidebar {...this.props.sidebarProps}>
        <Route path='/community' component={CommunitySettings} />
        <Route path='/mobilizations' component={MobilizationsContainer} />
        <Route exact path='/account/edit' component={AccountPage} />
      </SidebarAPI.Sidebar>
    )
  }
}

const mapStateToProperties = (state, properties) => ({
  sidebarProps: SidebarAPI.getSidebarProps(state, properties),
  community: CommunitySelectors.getCurrent(state),
  loading: MobSelectors(state, properties).mobilizationsIsLoading(),
  loaded: MobSelectors(state, properties).mobilizationsIsLoaded(),
  dnsControlSelectors: DNSControlSelectors(state)
})

const mapDispatchToProperties = { ...MobActions, ...DNSControlActions }

export default connect(mapStateToProperties, mapDispatchToProperties)(SubRoute)
