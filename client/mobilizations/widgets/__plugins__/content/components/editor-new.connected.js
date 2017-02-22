import { connect } from 'react-redux'
import MobSelectors from '~client/mobrender/redux/selectors'
import EditorNew from './editor-new'

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilization()
})

export default connect(mapStateToProps)(EditorNew)
