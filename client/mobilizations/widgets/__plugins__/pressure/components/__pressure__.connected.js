import { connect } from 'react-redux'
import MobSelectors from '~client/mobrender/redux/selectors'
import * as PressureActions from '../action-creators'
import Pressure from './__pressure__'

const mapStateToProps = (state, props) => {
  const pressure = MobSelectors(state, props).getPlugin('pressure')
  return {
    saving: pressure.saving,
    filled: pressure.filled
  }
}

export default connect(mapStateToProps, PressureActions)(Pressure)
