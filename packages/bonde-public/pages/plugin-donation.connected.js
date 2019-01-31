import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { DonationPlugin } from 'bonde-webpage/lib/plugins/donation'
import donationGraphql from 'bonde-webpage/lib/plugins/donation/plugin.graphql'
import { donationTransactionCreate } from 'bonde-webpage/lib/plugins/donation/redux/action-creators'
import { selectors as MobSelectors } from 'bonde-webpage/lib/redux'


const mapStateToProps = state => MobSelectors(state).getMobilizationLink()

export default donationGraphql(connect(mapStateToProps, { donationTransactionCreate })(injectIntl(DonationPlugin)))