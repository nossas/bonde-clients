const donationTransactionConvert = params => (dispatch, getState, { api, intl }) => {
    const endpoint = `/convert`
    const body = { donation: genRequestPayload(params) }
  
    return api.post(endpoint, body)
  }
  
  export default donationTransactionConvert
  
  const genRequestPayload = params => ({
    amount: params.amount,
    donation_id: params.donation_id,
    delay_charge: params.delay_charge,
  })
  