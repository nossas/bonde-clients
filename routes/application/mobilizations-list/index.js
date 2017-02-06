// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import MobilizationListPageConnected from './page.connected'

const RoutesMobilizations = store => ({
  path: 'mobilizations/list',
  component: MobilizationListPageConnected
})

export default RoutesMobilizations
