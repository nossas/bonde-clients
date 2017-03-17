import { connect } from 'react-redux'
import TellAFriend from './tell-a-friend'

const mapStateToProps = ({ sourceRequest: { protocol, host } }) => ({
  href: `${protocol}://${host}`
})

export default connect(mapStateToProps)(TellAFriend)
