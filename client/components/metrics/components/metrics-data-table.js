import React from 'react'
import * as stringHelper from '~client/utils/string-helper'

const Value = ({ loading, value }) => (
  loading
    ? <i className='fa fa-circle-o-notch fa-spin lightestgray' />
    : <b>{value}</b>
)

const MetricsDataTable = ({ data: { loading, ...data } }) => (
  <table>
    <tr>
      <td>Total de ativistas únicos:</td>
      <td className='px2'>
        <Value loading={loading} value={data.totalUniqueActivists} />
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
        <Value
          loading={loading}
          value={`R$ ${stringHelper.formatCurrency(data.totalDonationsChargedBackAmount)}`}
        />
      </td>
    </tr>
    <tr>
      <td>Valor total de doações coletadas até agora:</td>
      <td className='px2'>
        <Value
          loading={loading}
          value={`R$ ${stringHelper.formatCurrency(data.totalDonationsPaidAmount)}`}
        />
      </td>
    </tr>
    <tr>
      <td>Valor total de reembolso das doações coletadas até agora:</td>
      <td className='px2'>
        <Value
          loading={loading}
          value={`R$ ${stringHelper.formatCurrency(data.totalDonationsRefundedAmount)}`}
        />
      </td>
    </tr>
    <tr>
      <td>Valor total das doações recusadas até agora:</td>
      <td className='px2'>
        <Value
          loading={loading}
          value={`R$ ${stringHelper.formatCurrency(data.totalDonationsRefusedAmount)}`}
        />
      </td>
    </tr>
    <tr>
      <td>Valor total das doações aguardando pagamento até agora:</td>
      <td className='px2'>
        <Value
          loading={loading}
          value={`R$ ${stringHelper.formatCurrency(data.totalDonationsWaitingPaymentAmount)}`}
        />
      </td>
    </tr>
    <tr>
      <td>Valor total das doações recorrentes nos últimos 30 dias:</td>
      <td className='px2'>
        <Value
          loading={loading}
          value={`R$ ${stringHelper.formatCurrency(data.totalSubscriptionDonationsAmountLastMonth)}`}
        />
      </td>
    </tr>
    <tr>
      <td>Valor total das doações únicas nos últimos 30 dias:</td>
      <td className='px2'>
        <Value
          loading={loading}
          value={`R$ ${stringHelper.formatCurrency(data.totalUniqueDonationsAmountLastMonth)}`}
        />
      </td>
    </tr>
  </table>
)

export default MetricsDataTable
