const donationTransactionConvert = params => (dispatch, getState, { api, intl }) => {
  const endpoint = `/convert-donation`
  const { donation_id, amount } = params
  
  return api.get(endpoint, { params })
}
  
export default donationTransactionConvert
