/*
Axios wrapper
intercepts a response for JWT refresh in the event of a 401 error
*/
import axios from 'axios';
import TokenStorage from './token.service';

const Axios = axios;

Axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // This implementation using a bool could possibly be improved
  if (!TokenStorage.should_check_refresh) {
    return;
  }

  return TokenStorage.getNewToken()
      .then((token) => {
        TokenStorage.storeAccessToken(token);
        const {config} = error;
        config.headers.Authorization = `Bearer ${token}`;
        return new Promise((resolve, reject) => {
          axios.request(config).then((response) => {
            resolve(response);
          }).catch((err) => {
            reject(err);
          });
        });
      })
      .catch((err) => {
        Promise.reject(err);
        TokenStorage.should_check_refresh = false;
      });
});

export default Axios;
