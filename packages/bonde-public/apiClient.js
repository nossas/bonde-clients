import axios from 'axios'

const API_URL = process.env.API_URL !== undefined
  ? process.env.API_URL
  : 'http://api-v1.bonde.devel'

export default axios.create({ baseURL: API_URL })
