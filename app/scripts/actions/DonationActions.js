import { FINISH_TRANSACTION, TRANSACTION_FAIL, TRANSACTION_DONE } from '../constants/ActionTypes'
import superagent from 'superagent'

export function finishTransaction(params) {
  return dispatch => {
    superagent
    .post(`${process.env.API_URL}/donations`)
    .send({
      token: params.token,
      payment_method: params.payment_method
    })
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
