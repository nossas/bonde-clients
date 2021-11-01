import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { DonationPlugin } from './bonde-webpage/plugins/donation'
import donationGraphql from './bonde-webpage/plugins/donation/plugin.graphql'
import { donationTransactionCreate } from './bonde-webpage/plugins/donation/redux/action-creators'

export default donationGraphql(connect(undefined, { donationTransactionCreate })(injectIntl(DonationPlugin)))