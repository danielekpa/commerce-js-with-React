import axios from 'axios';

axios.defaults.baseURL = process.env.SERVER_URL;

// axios.defaults.baseURL = 'https://api.chec.io/v1';

export const $axios = axios.create({
  'X-Authorization': process.env.REACT_APP_CHEC_PRIVATE_KEY,
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

// axios.defaults.headers.common['Content-Type'] = 'application/json';

/* axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      if (
        error.response.status === 404
        && error.response.data.message === 'This account doesnt exist'
      ) {
        NavigationService.navigate(NAV_APP_LOGOUT);
      }
    }
    return Promise.reject(error);
  },
); */
