import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as CommunityActions from '~community/actions'
import * as CommunitySelectors from '~community/selectors'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []

    !CommunitySelectors.isLoaded(state) && promises.push(
      dispatch(CommunityActions.fetch())
    )
    return promises
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: CommunitySelectors.isLoading(state),
  isLoaded: CommunitySelectors.isLoaded(state),
  communities: CommunitySelectors.getCommunities(state)
})

export default provideHooks(redial)(
  connect(mapStateToProps, CommunityActions)(Page)
)
