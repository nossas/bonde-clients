import { connect } from 'react-redux'
import { Background } from '~client/components/layout'

const mapStateToProps = () => ({
  image: process.env.BROWSER ? require('~client/images/bg-login.png') : ''
})

export default connect(mapStateToProps)(Background)
