import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import * as CommunitySelectors from '~community/selectors'
import * as CommunityActions from '~community/action-creators'
import Sidebar from '~components/navigation/sidebar'

import Container from './container'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []
    !MobilizationSelectors.isLoaded(state) && promises.push(
      dispatch(MobilizationActions.asyncFetch(state.community.currentId))
    )
    !CommunitySelectors.getList(state).length && promises.push(
      dispatch(CommunityActions.asyncFetch())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => ({
  loading: state.mobilizations.list.loading,
  relationshipId: state.community.currentId,
  sidebarProps: Sidebar.getSidebarProps(state, props)
})

export default provideHooks(redial)(
  connect(mapStateToProps, MobilizationActions)(Container)
)
