const donationTransactionConvert = params => (dispatch, getState, { api, intl }) => {
    const endpoint = `/convert`
    const body = { donation: genRequestPayload(params) }
  
    return api.post(endpoint, body)
  }
  
export default donationTransactionConvert

const genRequestPayload = params => ({
  amount: params.amount,
  email: params.email,
  widget_id: params.widget_id
})
