//
// @route /community
//
import { connect } from 'react-redux'
import AuthSelectors from '~client/account/redux/selectors'
import * as CommunityActions from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'

import Page from './page'

const mapStateToProps = state => {
  const user = AuthSelectors(state).getUser()
  const loading = CommunitySelectors.isLoading(state) || !user
  return {
    user,
    isLoading: loading,
    isLoaded: CommunitySelectors.isLoaded(state),
    communities: CommunitySelectors.getList(state)
  }
}

export default connect(mapStateToProps, CommunityActions)(Page)
