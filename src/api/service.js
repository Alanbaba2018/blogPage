import axios from 'axios';
import { Message } from 'element-ui';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 150000
});

axiosInstance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  Promise.reject(error);
});

// respone拦截器
axiosInstance.interceptors.response.use((response) => {
  const res = response.data;
  if (res.code === 200) {
    return res.data;
  } else {
    Message.info(`${res.code}:${res.message}`);
    return res;
  }
}, (error) => {
  const errorData = error.response && error.response.data;
  Message.error('error:返回数据出错');
  return Promise.reject(errorData);
});

export default class Service {
  static get(url, options = {}) {
    return new Promise((resolve, reject) => {
      axiosInstance.get(url, options).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static post(url, data, options = {}) {
    return new Promise((resolve, reject) => {
      axiosInstance.post(url, data, options).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static put(url, data, options = {}) {
    return new Promise((resolve, reject) => {
      axiosInstance.put(url, data, options).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static delete(url, options = {}) {
    return new Promise((resolve, reject) => {
      axiosInstance.delete(url, options).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static head(url, options = {}) {
    return new Promise((resolve, reject) => {
      axiosInstance.delete(url, options).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static patch(url, data, options = {}) {
    return new Promise((resolve, reject) => {
      axiosInstance.patch(url, data, options).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  static request(options) {
    return new Promise((resolve, reject) => {
      axiosInstance(options).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
