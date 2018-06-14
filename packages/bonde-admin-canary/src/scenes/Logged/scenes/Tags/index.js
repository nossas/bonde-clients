import { auth } from 'services/auth'
import { translate } from 'services/i18n'
import Tags from './Tags'

export default translate('tags')(auth()(Tags))
