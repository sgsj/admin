import axios from 'axios'
import qs from 'qs'
import { LocalStorage } from 'quasar'

export default ({ Vue }) => {
  if (!process.env.DEV) {
    axios.defaults.baseURL = 'http://localhost/'
  } else {
    axios.defaults.baseURL = '/api'
  }

  axios.withCredentials = true

  // http request拦截
  axios.interceptors.request.use((config) => {
    console.log('lanjieqi', LocalStorage.getItem('userkey'),config)
    const tk = LocalStorage.getItem('userkey')
    if (tk) {
      config.headers.Authorization = 'Bearer ' + LocalStorage.getItem('userkey')
      return config
    }
    return config
  }, error => {
    return Promise.reject(error)
  })
  console.log('继续')
  // axios.defaults.transformRequest = [function (data, headers) {
  //   return qs.stringify(data)
  // }]

  Vue.prototype.$axios = axios
}
