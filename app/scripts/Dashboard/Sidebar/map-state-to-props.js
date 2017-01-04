import { selectors as AccountSelectors } from '../../../modules/account'
import { selectors as CommunitySelectors } from '../../../modules/community'
import { selectors as MobilizationSelectors } from '../../../modules/mobilizations'

export default (state, ownProps) => ({
  loading: state.mobilization.loading,
  user: AccountSelectors.getUser(state),
  mobilization: MobilizationSelectors.getCurrent(state),
  community: CommunitySelectors.getCurrent(state)
})
