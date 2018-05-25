import { connect } from '../../../services/redux'
import FullPage from './FullPage'

const mapStateToProps = (state) => ({
  pageTitle: state.header.title,
  actions: state.header.actions
})

export default connect(mapStateToProps)(FullPage)
