import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import Form from './plugin'
// TODO: Remove this dependencies
import * as MobActions from '@/mobrender/redux/action-creators'

const mapDispatchToProps = {
  asyncFormEntryCreate: MobActions.asyncFormEntryCreate
}

export default connect(undefined, mapDispatchToProps)(injectIntl(Form))