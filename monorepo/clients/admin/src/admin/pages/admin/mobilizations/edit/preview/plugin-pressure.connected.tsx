import { connect } from 'react-redux'
import { PressurePlugin } from './bonde-webpage/plugins/pressure'
import { fillWidget } from './bonde-webpage/plugins/pressure/redux/action-creators'

const mapDispatchToProperties = { fillWidget }

export default connect(undefined, mapDispatchToProperties)(PressurePlugin)