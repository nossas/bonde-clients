import { tourtip } from 'components/Tourtip'
import { withLastLocation } from 'services/router'
import Home from './Home'

export default withLastLocation(
  tourtip({
    init: ({ lastLocation }) => lastLocation && lastLocation.pathname === '/admin/tags'
  })(Home)
)

