import { connect } from 'react-redux'
import MobSelectors from '@/mobrender/redux/selectors'
import * as PressureActions from '@/mobilizations/widgets/__plugins__/pressure/action-creators'
import Pressure from './plugin'

const mapStateToProps = (state, props) => {
  const pressure = MobSelectors(state, props).getPlugin('pressure')
  const { saving, filledPressureWidgets } = pressure
  return { saving, filledPressureWidgets }
}

const mapDispatchToProps = { ...PressureActions }

export default connect(mapStateToProps, mapDispatchToProps)(Pressure)
