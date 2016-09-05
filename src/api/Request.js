import { Axios } from 'axios'

class Request extends Axios {

  constructor(...args) {
    super(...args)
    this.defaults.baseURL = `${process.env.API_URL}`
  }
}

export default Request
