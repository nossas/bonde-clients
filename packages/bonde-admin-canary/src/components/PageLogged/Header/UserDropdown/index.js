import { translate } from 'services/i18n'
import { auth } from 'services/auth'
import UserDropdown from './UserDropdown'

export default translate('header')(auth()(UserDropdown))
