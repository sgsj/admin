import axios from 'axios'
import qs from 'qs'
import { localStorage } from 'quasar'

export default ({ Vue }) => {
  if (!process.env.DEV) {
    axios.defaults.baseURL = 'http://localhost/'
  } else {
    axios.defaults.baseURL = 'http://localhost:3000/'
  }

  axios.withCredentials = true

  axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('userkey')

  axios.defaults.transformRequest = [function (data, headers) {
    return qs.stringify(data)
  }]

  Vue.prototype.$axios = axios
}
