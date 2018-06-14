import { auth } from 'services/auth'
import { translate } from 'services/i18n'
import CreateUserTagsForm from './CreateUserTagsForm'

export default translate('tags')(auth()(CreateUserTagsForm))
