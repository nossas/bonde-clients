import { gql } from 'react-apollo'

export const queries = {
  totalUniqueActivists: gql`
  query metricsCommunity($communityId: Int!) {
    totalUniqueActivists: totalUniqueActivistsByCommunity(comId: $communityId)
  }`,
  totalUniqueActivistsLast90Days: gql`
  query metricsCommunity($communityId: Int!) {
    totalUniqueActivistsLast90Days: totalUniqueActivistsByCommunityInterval(
      comId: $communityId
      timeinterval: { days: 90 }
    )
  }`,
  totalActivistsPressureLast90Days: gql`
  query metricsCommunity($communityId: Int!) {
    totalActivistsPressureLast90Days: totalUniqActivistsByKindAndCommunityInterval(
      comId: $communityId
      kindName: "activist_pressure"
      timeinterval: { days: 90 }
    )
  }`,
  totalActivistsFormEntryLast90Days: gql`
  query metricsCommunity($communityId: Int!) {
    totalActivistsFormEntryLast90Days: totalUniqActivistsByKindAndCommunityInterval(
      comId: $communityId
      kindName: "form_entry"
      timeinterval: { days: 90 }
    )
  }`,
  totalDonationsChargedBackAmount: gql`
  query metricsCommunity($communityId: Int!) {
    totalDonationsChargedBackAmount: totalSumDonationsFromCommunity(
      comId: $communityId
      status: "chargedback"
    )
  }`,
  totalDonationsPaidAndWaitingAmount: gql`
  query metricsCommunity($communityId: Int!) {
    totalDonationsPaidAmount: totalSumDonationsFromCommunity(
      comId: $communityId
      status: "paid"
    )
    totalDonationsWaitingPaymentAmount: totalSumDonationsFromCommunity(
      comId: $communityId
      status: "waiting_payment"
    )
  }`,
  totalDonationsRefundedAmount: gql`
  query metricsCommunity($communityId: Int!) {
    totalDonationsRefundedAmount: totalSumDonationsFromCommunity(
      comId: $communityId
      status: "refunded"
    ) 
  }`,
  totalDonationsRefusedAmount: gql`
  query metricsCommunity($communityId: Int!) {
    totalDonationsRefusedAmount: totalSumDonationsFromCommunity(
      comId: $communityId
      status: "refused"
    )
  }`,
  totalDonationsWaitingPaymentAmount: gql`
  query metricsCommunity($communityId: Int!) {
    totalDonationsWaitingPaymentAmount: totalSumDonationsFromCommunity(
      comId: $communityId
      status: "waiting_payment"
    )
  }`,
  totalSubscriptionDonationsAmountLastMonth: gql`
  query metricsCommunity($communityId: Int!) {
    totalSubscriptionDonationsAmountLastMonth: totalSumSubscriptionDonationsFromCommunityInterval(
      comId: $communityId
      status: "paid"
      timeinterval: { months: 1 }
    )
  }`,
  totalUniqueDonationsAmountLastMonth: gql`
  query metricsCommunity($communityId: Int!) {
    totalUniqueDonationsAmountLastMonth: totalSumUniqDonationsFromCommunityInterval(
      comId: $communityId
      status: "paid"
      timeinterval: { months: 1 }
    )
  }`,
}