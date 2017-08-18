import { connect } from 'react-redux'
import { asyncDonationTransactionCreate } from '../action-creators'
import { Donation } from './__donation__'

const mapActionsToProps = {
  handleDonationTransactionCreate: asyncDonationTransactionCreate
}

export default connect(undefined, mapActionsToProps)(Donation)
