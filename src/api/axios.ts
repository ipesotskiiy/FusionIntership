import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';
import checkRefreshToken from '../utils/checkRefreshToken';

const instance = axios.create({
  baseURL: config.apiBaseUrl,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use((response) => {
  if (response.data === 'OK') {
    return response;
  }

  if ('token' in response.data) {
    Cookies.set('token', response.data.token);
    Cookies.set('refreshToken', response.data?.refreshToken);
  }

  return response;
}, async (err) => {
  if (err.response.status === 401 &&
    err.response.data.data.message === 'Token expired') {
    await checkRefreshToken();
    const req = { ...err.config };
    req.headers.authorization = `Bearer ${Cookies.get('token')}`;
    return axios.request(req);
  }
});

export default instance;
