import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import Form from './plugin'
import { asyncFormEntryCreate } from '../../redux/action-creators'

const mapDispatchToProps = { asyncFormEntryCreate }

export default connect(undefined, mapDispatchToProps)(injectIntl(Form))