import { connect } from 'react-redux'
import MobSelectors from '~client/mobrender/redux/selectors'
import Page from './page'

const mapStateToProps = state => ({
  mobilization: MobSelectors(state).getMobilization() || {}
})

export default connect(mapStateToProps)(Page)
