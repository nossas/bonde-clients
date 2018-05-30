import { auth } from 'services/auth'
import { translate } from 'services/i18n'
import UserDropdown from './UserDropdown'

export default translate('header')(auth()(UserDropdown))
