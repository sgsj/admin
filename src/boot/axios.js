import axios from 'axios'
import qs from 'qs'
import { LocalStorage } from 'quasar'

export default ({ Vue }) => {
  if (!process.env.DEV) {
    axios.defaults.baseURL = 'http://localhost/'
  } else {
    axios.defaults.baseURL = 'http://localhost:3000/'
  }

  axios.withCredentials = true

  axios.interceptors.request.use((config) => {
    console.log('lanjieqi', LocalStorage.getItem('userkey'))
    if (LocalStorage.getItem('userkey')) {
      config.headers.userToken = 'Bearer ' + LocalStorage.getItem('userkey')
      return config
    }
    return config
  })
  console.log('继续')
  axios.defaults.transformRequest = [function (data, headers) {
    return qs.stringify(data)
  }]

  Vue.prototype.$axios = axios
}
