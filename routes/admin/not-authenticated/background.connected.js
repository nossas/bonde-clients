import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { Background } from '~client/components/layout'

const mapStateToProps = () => ({
  image: require('exenv').canUseDOM ? require('~client/images/bg-login.png') : '',
  contentSize: 12
})

export default connect(mapStateToProps)(Background)
