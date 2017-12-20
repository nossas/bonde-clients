import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import Page from './page'

const mapStateToProps = state => ({
  mobilization: MobSelectors(state).getMobilization() || {}
})

export default connect(mapStateToProps)(Page)
