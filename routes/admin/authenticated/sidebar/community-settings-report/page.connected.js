import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as CommunityActions from '~community/action-creators'
import * as CommunitySelectors from '~community/selectors'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []

    !CommunitySelectors.isLoaded(state) && promises.push(
      dispatch(CommunityActions.asyncFetch())
    )
    !CommunitySelectors.getCurrentId(state) && promises.push(
      dispatch(CommunityActions.select(1))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  community: CommunitySelectors.getCurrent(state)
})

const mapDispatchToProps = {
  submit: CommunityActions.asyncEdit,
  ...CommunityActions
}

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(Page))
