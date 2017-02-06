import { connect } from 'react-redux'

import * as MobilizationSelectors from '~mobilizations/selectors'
import MobilizationListPage from './page'

const mapStateToProps = state => ({
  mobilizations: MobilizationSelectors.getList(state),
  menuActiveIndex: MobilizationSelectors.getMenuActiveIndex(state)
})

export default connect(mapStateToProps)(MobilizationListPage)
