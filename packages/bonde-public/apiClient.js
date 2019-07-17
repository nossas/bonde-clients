import axios from 'axios'
import getConfig from 'next/config'

export default axios.create({
  baseURL: process.env.REACT_APP_DOMAIN_API_REST || 'http://api-v1.bonde.devel'
})
