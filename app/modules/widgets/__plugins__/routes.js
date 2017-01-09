import matchRoutes from './match/routes'
import pressureRoutes from './pressure/routes'
import formRoutes from './form/routes'
import { createRoutes as donationCreateRoutes } from '../../../scripts/Widget/plugins/Donation'

export default () => [
  matchRoutes(),
  pressureRoutes(),
  formRoutes(),
  donationCreateRoutes()
]
