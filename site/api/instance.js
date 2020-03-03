import axios from 'axios';
import { toast } from 'react-toastify';
import { loadProgressBar } from 'axios-progress-bar';
import Router from 'next/router';

const isClientSide = () => typeof window !== 'undefined';

export const Instance = (config) => {
  const instance = axios.create({
    baseURL: config.API_URL,
    withCredentials: true,
  });

  if (isClientSide()) {
    loadProgressBar(null, instance);
  }

  instance.interceptors.request.use((conf) => {
    const authorization = {};
    if (isClientSide()) {
      authorization.Authorization = `Basic ${sessionStorage.getItem('token')}`;
    }
    return {
      ...conf,
      headers: {
        ...conf.headers,
        ...authorization,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  });

  instance.interceptors.response.use(
    (response) => {
      if (response.config.method === 'post') {
        toast.success('Збережено!');
      }
      return (response || {}).data;
    },
    async (error) => {
      if (isClientSide()) {
        toast.error(`${error.response.status} ${JSON.stringify(error.response.data)}`);
      }
      if ([401, 500].includes(error.response.status)) {
        sessionStorage.removeItem('token');
        await Router.push('/admin/login');
      }
      return Promise.reject(error.response);
    }
  );

  return {
    get(what, params) {
      return instance.get(config.endpoints[what], { params });
    },
    post(what, params) {
      return instance.post(config.endpoints[what], new URLSearchParams(params).toString());
    },
  };
};

export default { Instance };
