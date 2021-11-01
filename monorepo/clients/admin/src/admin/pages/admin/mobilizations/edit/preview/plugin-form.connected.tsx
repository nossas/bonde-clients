import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { FormPlugin } from './bonde-webpage/plugins/form'
import { asyncFormEntryCreate } from './bonde-webpage/redux/action-creators'

const mapDispatchToProperties = { asyncFormEntryCreate }

export default connect(undefined, mapDispatchToProperties)(injectIntl(FormPlugin))