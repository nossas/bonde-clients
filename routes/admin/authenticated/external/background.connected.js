import { connect } from 'react-redux'
import { Background } from '~client/components/layout'

const mapStateToProps = () => ({
  image: require('exenv').canUseDOM ? require('~client/images/bg-login.png') : ''
})

export default connect(mapStateToProps)(Background)
