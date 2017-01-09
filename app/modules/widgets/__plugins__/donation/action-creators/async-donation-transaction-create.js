import { createAction } from './create-action'
import * as t from '../action-types'

const asyncDonationTransactionCreate = params => (dispatch, getState, axios) => {
  const endpoint = `/mobilizations/${params.mobilization_id}/donations`
  const body = { donation: genRequestPayload(params) }

  return axios.post(endpoint, body)
    .then(response => {
      dispatch(createAction(t.TRANSACTION_DONE, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncDonationTransactionCreate

const genRequestPayload = params => ({
  widget_id: params.widget_id,
  card_hash: params.card_hash,
  payment_method: params.payment_method,
  amount: params.amount,
  customer: params.customer,
  subscription: params.subscription,
  period: params.recurring_period
})
