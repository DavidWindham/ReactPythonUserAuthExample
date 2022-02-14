/*
Axios wrapper
intercepts a response for JWT refresh in the event of a 401 error
*/
import axios from 'axios'
import TokenStorage from './token.service'

const Axios = axios

Axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }

  // This implementation using a bool could possibly be improved
  if (!TokenStorage.getRefreshCheck()) {
    return
  }

  return TokenStorage.getNewToken()
      .then((token:string|unknown) => {
        const tokenString = token as string
        TokenStorage.storeAccessToken(tokenString)
        TokenStorage.setRefreshTrue()
        const {config} = error
        config.headers.Authorization = `Bearer ${token}`
        return new Promise((resolve, reject) => {
          axios.request(config).then((response) => {
            resolve(response)
          }).catch((err) => {
            reject(err)
          })
        },
        )
      })
      .catch((err) => {
        Promise.reject(err)
        TokenStorage.setRefreshFalse()
      })
})

export default Axios
