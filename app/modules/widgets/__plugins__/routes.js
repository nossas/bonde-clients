import matchRoutes from './match/routes'
import pressureRoutes from './pressure/routes'
import { createRoutes as formCreateRoutes } from '../../../scripts/Widget/plugins/Form'
import { createRoutes as donationCreateRoutes } from '../../../scripts/Widget/plugins/Donation'

export default () => [
  matchRoutes(),
  pressureRoutes(),
  formCreateRoutes(),
  donationCreateRoutes()
]
