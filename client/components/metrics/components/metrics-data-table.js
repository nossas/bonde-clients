import React from 'react'
import format from 'format-number'
import { MetricsCard } from '~client/components/metrics/components'

const formatOptions = { integerSeparator: '.', decimal: ',' }
const currency = format({ ...formatOptions, prefix: 'R$ ', padRight: 2, truncate: 2 })
const number = format(formatOptions)

const Value = ({ loading, value }) => (
  loading
    ? <i className='fa fa-circle-o-notch fa-spin lightestgray' />
    : <b>{value}</b>
)

const MetricsDataTable = ({ data: { loading, ...data } }) => (
  <div>
    <div className='clearfix mxn1'>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#DD2396'
          loading={loading}
          title='Ativistas'
          footer={<span>Total de ativistas únicos<br />&nbsp;</span>}
        >
          {number(data.totalUniqueActivists)}
        </MetricsCard>
      </div>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#DD2396'
          loading={loading}
          title='Ativistas'
          footer={<span>Total de ativistas ativos<br />nos últimos 90 dias</span>}
        >
          {number(data.totalUniqueActivistsLast90Days)}
        </MetricsCard>
      </div>

      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#40B4E5'
          loading={loading}
          title='Ações'
          footer={<span>Total de ações de pressão<br/>nos últimos 90 dias</span>}
        >
          {number(data.totalActivistsPressureLast90Days)}
        </MetricsCard>
      </div>

      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#40B4E5'
          loading={loading}
          title='Ações'
          footer={<span>Total de ações de assinatura<br />nos últimos 90 dias</span>}
        >
          {number(data.totalActivistsFormEntryLast90Days)}
        </MetricsCard>
      </div>
    </div>

    <div className='clearfix mxn1'>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#00C08A'
          loading={loading}
          title='Doações'
          footer='Valor total das doações únicas confirmadas nos últimos 30 dias'
          contentStyle={{ fontSize: '2.1vw', lineHeight: '2.2' }}
        >
          {currency(data.totalUniqueDonationsAmountLastMonth)}
        </MetricsCard>
      </div>

      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#00C08A'
          loading={loading}
          title='Doações'
          footer='Valor total das doações recorrentes confirmadas nos últimos 30 dias'
          contentStyle={{ fontSize: '2.1vw', lineHeight: '2.2' }}
        >
          {currency(data.totalSubscriptionDonationsAmountLastMonth)}
        </MetricsCard>
      </div>

      <div className='mb2 col col-12 lg-col-6 px1'>
        <MetricsCard
          backgroundColor='#00C08A'
          loading={loading}
          title='Doações'
          footer={
            <span>
              Valor total de doações únicas e recorrentes até agora<br />
              (confirmadas / aguardando pagamento)
            </span>
          }
          contentStyle={{ fontSize: '2.1vw', lineHeight: '2.2' }}
        >
          {currency(data.totalDonationsPaidAmount)}
          {' / '}
          {currency(data.totalDonationsWaitingPaymentAmount)}
        </MetricsCard>
      </div>
    </div>

    <table>
      <tbody>
        {data.totalDonationsChargedBackAmount > 0 && (
          <tr>
            <td>
              Valor total de devolução das doações coletadas até agora:</td>
            <td className='px2'>
              <Value
                loading={loading}
                value={currency(data.totalDonationsChargedBackAmount)}
              />
            </td>
          </tr>
        )}
        {data.totalDonationsRefundedAmount > 0 && (
          <tr>
            <td>Valor total de reembolso das doações coletadas até agora:</td>
            <td className='px2'>
              <Value
                loading={loading}
                value={currency(data.totalDonationsRefundedAmount)}
              />
            </td>
          </tr>
        )}
        {data.totalDonationsRefusedAmount > 0 && (
          <tr>
            <td>Valor total das doações recusadas até agora:</td>
            <td className='px2'>
              <Value
                loading={loading}
                value={currency(data.totalDonationsRefusedAmount)}
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)

export default MetricsDataTable
