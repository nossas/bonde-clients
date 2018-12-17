import axios from 'axios'

const API_URL = process.env.REACT_APP_DOMAIN_API_REST !== undefined
  ? process.env.REACT_APP_DOMAIN_API_REST
  : 'http://api-v1.bonde.devel'

export default axios.create({ baseURL: API_URL })
