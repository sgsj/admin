import axios from 'axios'
import qs from 'qs'

export default ({ Vue }) => {
  if (!process.env.DEV) {
    axios.defaults.baseURL = 'http://localhost/'
  } else {
    axios.defaults.baseURL = 'http://localhost:3000/'
  }

  axios.withCredentials = true

  axios.defaults.transformRequest = [function (data, headers) {
    return qs.stringify(data)
  }]

  Vue.prototype.$axios = axios
}
