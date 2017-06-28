import React from 'react'

const Value = ({ loading, value }) => (
  loading
    ? <i className='fa fa-circle-o-notch fa-spin lightestgray' />
    : <b>{value}</b>
)

const MetricsCommunity = ({ data: { loading, ...data } }) => {
  console.log('---data', data)
  return (
    <table>
      <tr>
        <td>Total de ativistas únicos:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalSubscriptionDonationsAmountLastMonth} />
        </td>
      </tr>
      <tr>
        <td>Total de ativistas ativos nos últimos 90 dias:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalUniqueActivistsLast90Days} />
        </td>
      </tr>
      <tr>
        <td>Total de ações de pressão nos últimos 90 dias:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalActivistsPressureLast90Days} />
        </td>
      </tr>
      <tr>
        <td>Total de ações de assinatura nos últimos 90 dias:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalActivistsFormEntryLast90Days} />
        </td>
      </tr>
      <tr>
        <td>Valor total de devolução das doações coletadas até agora:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalDonationsChargedBackAmount} />
        </td>
      </tr>
      <tr>
        <td>Valor total de doações coletadas até agora:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalDonationsPaidAmount} />
        </td>
      </tr>
      <tr>
        <td>Valor total de reembolso das doações coletadas até agora:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalDonationsRefundedAmount} />
        </td>
      </tr>
      <tr>
        <td>Valor total das doações recusadas até agora:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalDonationsRefusedAmount} />
        </td>
      </tr>
      <tr>
        <td>Valor total das doações aguardando pagamento até agora:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalDonationsWaitingPaymentAmount} />
        </td>
      </tr>
      <tr>
        <td>Valor total das doações recorrentes nos últimos 30 dias:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalUniqueActivists} />
        </td>
      </tr>
      <tr>
        <td>Valor total das doações únicas nos últimos 30 dias:</td>
        <td className='px2'>
          <Value loading={loading} value={data.totalUniqueDonationsAmountLastMonth} />
        </td>
      </tr>
    </table>
  )
}

export default MetricsCommunity
