import { connect } from 'react-redux'
import MobSelectors from '../redux/selectors'
import { asyncUpdateWidget as update } from '../redux/action-creators'
import Widget from './widget'

const mapStateToProps = (state, props) => ({
 saving: MobSelectors(state, props).widgetsIsLoading(),
})

const mapActionsToProps = { update }

export default connect(mapStateToProps, mapActionsToProps)(Widget)
