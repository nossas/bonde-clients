import { connect } from 'react-redux'
import EditorNew from './editor-new'
import MobSelectors from '~client/mobrender/redux/selectors'
import { handleEdit, handleCancelEdit } from '~client/mobrender/redux/action-creators'

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilization()
})

const mapActionsToProps = {
  onEdit: () => handleEdit('widget'),
  onCancelEdit: () => handleCancelEdit('widget')
}

export default connect(mapStateToProps, mapActionsToProps)(EditorNew)
