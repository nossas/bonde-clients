import React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import * as formatNumberHelper from 'utils/format-number-helper'
import { MetricsCard } from 'components/metrics/components'
import { queries } from '../metrics-community/metrics-community.graphql'

const TotalUniqueActivists = graphql(queries.totalUniqueActivists)(({ data: { loading, ...data } }) => {
  return (
    <MetricsCard
      backgroundColor='#DD2396'
      loading={loading}
      title={
        <FormattedMessage
          id='c--metrics.unique.activists.title'
          defaultMessage='Ativistas'
        />
      }
      footer={
        <span>
          <FormattedMessage
            id='c--metrics.unique.activists.subtitle'
            defaultMessage='Total de ativistas únicos'
          />
          <br />&nbsp;
        </span>
      }
    >
    {formatNumberHelper.number(data.totalUniqueActivists)}
    </MetricsCard>
  )
})

const TotalUniqueActivistsLast90Days = graphql(queries.totalUniqueActivistsLast90Days)(({ data: { loading, ...data } }) => {
  return (
    <MetricsCard
      backgroundColor='#DD2396'
      loading={loading}
      title={
        <FormattedMessage
          id='c--metrics.total.active.activists.title'
          defaultMessage='Ativistas'
        />
      }
      footer={
        <span>
          <FormattedMessage
            id='c--metrics.total.active.activists.subtitle'
            defaultMessage='Total de ativistas ativos{br}nos últimos 90 dias'
            values={{
              br: <br />
            }}
          />
        </span>
      }
    >
      {formatNumberHelper.number(data.totalUniqueActivistsLast90Days)}
    </MetricsCard>
  )
})

const TotalActivistsPressureLast90Days = graphql(queries.totalActivistsPressureLast90Days)(({ data: { loading, ...data } }) => {
  return (
    <MetricsCard
      backgroundColor='#40B4E5'
      loading={loading}
      title={
        <FormattedMessage
          id='c--metrics.total.pressure.actions.title'
          defaultMessage='Ações'
        />
      }
      footer={
        <span>
          <FormattedMessage
            id='c--metrics.total.pressure.actions.subtitle'
            defaultMessage='Total de ações de pressão {br} nos últimos 90 dias'
            values={{
              br: <br />
            }}
          />
        </span>
      }
    >
      {formatNumberHelper.number(data.totalActivistsPressureLast90Days)}
    </MetricsCard>
  )
})

const TotalActivistsFormEntryLast90Days = graphql(queries.totalActivistsFormEntryLast90Days)(({ data: { loading, ...data } }) => {
  return (
    <MetricsCard
      backgroundColor='#40B4E5'
      loading={loading}
      title={
        <FormattedMessage
          id='c--metrics.total.subscriptions.actions.title'
          defaultMessage='Ações'
        />
      }
      footer={
        <FormattedMessage
          id='c--metrics.total.subscriptions.actions.subtitle'
          defaultMessage='Total de ações de assinatura {br} nos últimos 90 dias'
          values={{
            br: <br />
          }}
        />
      }
    >
      {formatNumberHelper.number(data.totalActivistsFormEntryLast90Days)}
    </MetricsCard>
  )
})

const TotalUniqueDonationsAmountLastMonth = graphql(queries.totalUniqueDonationsAmountLastMonth)(({ data: { loading, ...data } }) => {
  return (
    <MetricsCard
      backgroundColor='#00C08A'
      loading={loading}
      title={
        <FormattedMessage
          id='c--metrics.total.unique.donations.title'
          defaultMessage='Doações'
        />
      }
      footer={
        <FormattedMessage
          id='c--metrics.total.unique.donations.subtitle'
          defaultMessage='Valor total das doações únicas confirmadas nos últimos 30 dias'
        />
      }
      contentStyle={{ fontSize: '2.1vw', lineHeight: '2.2' }}
    >
      {formatNumberHelper.currency(data.totalUniqueDonationsAmountLastMonth)}
    </MetricsCard>
  )
})

const TotalSubscriptionDonationsAmountLastMonth = graphql(queries.totalSubscriptionDonationsAmountLastMonth)(({ data: { loading, ...data } }) => {
  return (
    <MetricsCard
      backgroundColor='#00C08A'
      loading={loading}
      title={
        <FormattedMessage
          id='c--metrics.total.recurrent.donations.title'
          defaultMessage='Doações'
        />
      }
      footer={
        <FormattedMessage
          id='c--metrics.total.recurrent.donations.subtitle'
          defaultMessage='Valor total das doações recorrentes confirmadas nos últimos 30 dias'
        />
      }
      contentStyle={{ fontSize: '2.1vw', lineHeight: '2.2' }}
    >
      {formatNumberHelper.currency(data.totalSubscriptionDonationsAmountLastMonth)}
    </MetricsCard>
  )
})

const TotalDonationsPaidAndWaitingAmount = graphql(queries.totalDonationsPaidAndWaitingAmount)(
  ({ data: { loading, refetch, ...data } }) => {
    return (
      <MetricsCard
        backgroundColor='#00C08A'
        loading={loading}
        title={
          <span>
          <FormattedMessage
            id='c--metrics.total.unique-and-recurrent.donations.title'
            defaultMessage='Doações'
          />
          <button type='button' style={{position: 'absolute', right: '5px', top: '5px'}} onClick={() => refetch()}><span className='fa fa-refresh'></span></button>
          </span>
        }
        footer={
          <FormattedMessage
            id='c--metrics.total.unique-and-recurrent.donations.subtitle'
            defaultMessage='Valor total de doações únicas e recorrentes até agora {br}(confirmadas / aguardando pagamento)'
            values={{
              br: <br />
            }}
          />
        }
        contentStyle={{ fontSize: '2.1vw', lineHeight: '2.2' }}
      >
        {formatNumberHelper.currency(data.totalDonationsPaidAmount)}
        {' / '}
        {formatNumberHelper.currency(data.totalDonationsWaitingPaymentAmount)}
      </MetricsCard>
    )
  }
)

const TotalDonationsRefundedAmount = graphql(queries.totalDonationsRefundedAmount)(({ data: { loading, ...data } }) => {
  return !loading && data.totalDonationsRefundedAmount > 0 ? (
    <tr>
      <td>
        <FormattedMessage
          id='c--metrics.total.donations.refunded-amount'
          defaultMessage='Valor total de reembolso das doações coletadas até agora:'
        />
      </td>
      <td className='px2'>
        {formatNumberHelper.currency(data.totalDonationsRefundedAmount)}
      </td>
    </tr>
  ) : null
})

const TotalDonationsChargedBackAmount = graphql(queries.totalDonationsChargedBackAmount)(({ data: { loading, ...data } }) => {
  return !loading && data.totalDonationsChargedBackAmount > 0 ? (
      <tr>
        <td>
          <FormattedMessage
            id='c--metrics.total.donations.charged-back-amount'
            defaultMessage='Valor total de devolução das doações coletadas até agora:'
          />
        </td>
        <td className='px2'>
          {formatNumberHelper.currency(data.totalDonationsChargedBackAmount)}
        </td>
      </tr>
  ) : null
})

const TotalDonationsRefusedAmount = graphql(queries.totalDonationsRefusedAmount)(({ data: { loading, ...data } }) => {
  return !loading && data.totalDonationsRefusedAmount > 0 ? (
    <tr>
      <td>
        <FormattedMessage
          id='c--metrics.total.donations.refused-amount'
          defaultMessage='Valor total das doações recusadas até agora:'
        />
      </td>
      <td className='px2'>
        {formatNumberHelper.currency(data.totalDonationsRefusedAmount)}
      </td>
    </tr>
  ) : null
})

const MetricsDataTable = ({ communityId }) => (
  <div>
    <div className='clearfix mxn1'>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <TotalUniqueActivists communityId={communityId} />
      </div>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <TotalUniqueActivistsLast90Days communityId={communityId} />
      </div>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <TotalActivistsPressureLast90Days communityId={communityId} />
      </div>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <TotalActivistsFormEntryLast90Days communityId={communityId} />
      </div>
    </div>

    <div className='clearfix mxn1'>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <TotalUniqueDonationsAmountLastMonth communityId={communityId} />
      </div>

      <div className='mb2 col col-6 lg-col-3 px1'>
        <TotalSubscriptionDonationsAmountLastMonth communityId={communityId} />
      </div>

      <div className='mb2 col col-12 lg-col-6 px1'>
        <TotalDonationsPaidAndWaitingAmount communityId={communityId} />
      </div>
    </div>

    <table>
      <tbody>
        <TotalDonationsChargedBackAmount communityId={communityId} />
        <TotalDonationsRefundedAmount communityId={communityId} />
        <TotalDonationsRefusedAmount communityId={communityId} />
      </tbody>
    </table>
  </div>
)

export default MetricsDataTable
