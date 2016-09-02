import { Axios } from 'axios'

export default class Request extends Axios {
  constructor(...args) {
    super(...args)
    this.defaults.baseURL = '/api'
  }

  editMobilization(mobilization, headers) {
    return this.put(`/mobilizations/${mobilization.id}`, { mobilization }, { headers })
  }
}
