import { connect } from 'react-redux'
import EditorOld from './editor-old'
import MobSelectors from '~client/mobrender/redux/selectors'


const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    mobilization: selectors.getMobilization()
  }
}

export default connect(mapStateToProps)(EditorOld)
