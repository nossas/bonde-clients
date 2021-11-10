import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { injectIntl } from 'react-intl'
import AnalyticsEvents from './../../../../../mobilizations/widgets/utils/analytics-events'
import { asyncDonationTransactionCreate } from '../action-creators'

import * as graphqlQueries from './../../../../../graphql/queries'
import { factoryDonation } from './../../../../../mobrender-v2/widgets/donation'
import { FinishMessageCustom } from './../../../../../mobilizations/widgets/components'
import DonationTellAFriend from './donation-tell-a-friend'

const Donation = factoryDonation({
  finishMessageCustom: FinishMessageCustom,
  tellAFriend: DonationTellAFriend
})

interface Props {
  widget: {
    id: number
  }
}

export default graphql(
  graphqlQueries.fetchDonationGoalStats, {
    name: 'donationGoalStats',
    options: (props: Props) => ({
      variables: { widgetId: props.widget.id },
      fetchPolicy: 'network-only'
    })
  })(injectIntl(Donation))
