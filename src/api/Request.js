import { Axios } from 'axios'

class Request extends Axios {

  constructor(...args) {
    super(...args)
    this.defaults.baseURL = `${process.env.API_URL}`
  }

  editWidget(widget, mobilization, headers) {
    const endpoint = `/mobilizations/${mobilization.id}/widgets/${widget.id}`
    return this.put(endpoint, { widget }, { headers })
  }

  createTemplate(body, headers) {
    return this.post('/templates', body, { headers })
  }
}

export default Request
