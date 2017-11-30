import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'

import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  const { location: { query } } = props
  return {
    mobilizations: selectors.getMobilizations(query),
    menuActiveIndex: selectors.getMobilizationMenuActive()
  }
}

const mapActionsToProps = (dispatch) => ({
  select: (...args) => dispatch(MobActions.selectMobilization(...args)),
  toggleMenu: (...args) => dispatch(MobActions.toggleMobilizationMenu(...args)),
  changeStatus: (mob) => {
    return dispatch(MobActions.asyncUpdateMobilization({
      id: mob.id,
      status: mob.status === 'active' ? 'archived' : 'active'
    }))
  }
})

export default connect(mapStateToProps, mapActionsToProps)(Page)
