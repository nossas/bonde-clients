import { injectIntl } from 'react-intl'
import {
  adjustmentsForm,
  AdjustmentsSettingsForm
} from '~client/mobrender/widgets/adjustments'

export default injectIntl(adjustmentsForm(AdjustmentsSettingsForm))
