/*
Token service that holds and handles token and token functionality
*/
import Axios from './axios.service';


export class TokenStorage {
  should_check_refresh = false;
  static TOKEN = localStorage.getItem('auth_bearer_token');
  static REFRESH_TOKEN = localStorage.getItem('auth_bearer_refresh_token');

  static isAuthenticated() {
    return this.getToken() !== null;
  }

  static getAuthentication() {
    return {
      headers: {Authorization: `Bearer ${this.getToken()}`},
    };
  }

  static getAuthenticationAndRefresh() {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        RefreshToken: `${this.getRefreshToken()}`,
      },
    };
  }

  static getNewToken() {
    this.unload_old_access_token();
    return new Promise((resolve, reject) => {
      Axios
          .get('/refresh_token', {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': `${this.getRefreshToken()}`,
            },
          })
          .then((response) => {
            this.storeAccessToken(response.data.access_token);
            // Changes check flag so subsequent requests will try and refresh
            this.should_check_refresh = true;
            resolve(response.data.access_token);
          })
          .catch((error) => {
            // Ensures flag is false as this error is the refresh token expiring
            this.should_check_refresh = false;
            reject(error);
          });
    });
  }

  static storeTokens(token) {
    this.clear();
    this.storeAccessToken(token.access_token);
    this.storeRefreshToken(token.refresh_token);
    this.should_check_refresh = true;
  }

  static storeAccessToken(token) {
    localStorage.setItem('auth_bearer_token', token);
    this.TOKEN = token;
  }

  static storeRefreshToken(token) {
    localStorage.setItem('auth_bearer_refresh_token', token);
    this.REFRESH_TOKEN = token;
  }

  static unload_old_access_token() {
    localStorage.removeItem('auth_bearer_token');
    this.TOKEN = null;
  }

  static clear() {
    localStorage.removeItem('auth_bearer_token');
    localStorage.removeItem('auth_bearer_refresh_token');
    this.TOKEN = null;
    this.REFRESH_TOKEN = null;
  }

  static getToken() {
    return this.TOKEN;
  }

  static getRefreshToken() {
    return this.REFRESH_TOKEN;
  }
}

export default TokenStorage;
