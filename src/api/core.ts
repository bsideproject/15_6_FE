import axios, { AxiosRequestConfig } from 'axios';
import { getCookie } from '@/utils/cookie';
import { isProductionMode } from '@/utils/env';

export const axiosInstance = axios.create({
    baseURL: '/api',
});

axiosInstance.interceptors.request.use((config) => {
    const token = getCookie('token');
    if (token) {
        config.headers['access-token'] = getCookie('token');
    }
    return config;
});

export const get = (url: string, config?: AxiosRequestConfig<any>) =>
    axiosInstance
        .get(url, config)
        .then((response) => response.data)
        .then((data) => data.response_data);

export const deleteApi = (url: string, config?: AxiosRequestConfig<any>) =>
    axiosInstance
        .delete(url, config)
        .then((response) => response.data)
        .then((data) => data.response_data);

export const post = (url: string, data?: any, config?: AxiosRequestConfig<any>) =>
    axiosInstance
        .post(url, data, config)
        .then((response) => response.data)
        .then((data) => data.response_data);

export const put = (url: string, data?: any, config?: AxiosRequestConfig<any>) =>
    axiosInstance
        .put(url, data, config)
        .then((response) => response.data)
        .then((data) => data.response_data);
