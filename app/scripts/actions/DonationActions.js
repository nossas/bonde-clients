import { FINISH_TRANSACTION, TRANSACTION_FAIL, TRANSACTION_DONE } from '../constants/ActionTypes'
import superagent from 'superagent'

export function finishTransaction(params) {
  return dispatch => {
    superagent
    .post(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/donations`)
    .send({donation: {
      widget_id: params.widget_id,
      token: params.token,
      payment_method: params.payment_method,
      amount: params.amount
    }})
    .end((err, res) => {
      if (err) {
        dispatch({
          type: TRANSACTION_FAIL,
          data: res.body,
          err
        })
      } else {
        dispatch({
          type: TRANSACTION_DONE,
          data: res.body
        })
      }
    })
  }
}
