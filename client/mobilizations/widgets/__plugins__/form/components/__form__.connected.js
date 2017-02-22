import { connect } from 'react-redux'
import MobSelectors from '~client/mobrender/redux/selectors'
import Form from './__form__'

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilization()
})

export default connect(mapStateToProps)(Form)
