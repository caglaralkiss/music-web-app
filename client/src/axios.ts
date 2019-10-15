import _axios from 'axios';
import { Endpoint, getBaseUrl } from './api';

const axios = { ..._axios };

const BASE_URL = getBaseUrl();

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

async function del<T = any, R = any>(url: string) {
    return await axios.delete<T, R>(`${BASE_URL}${url}`);
}

async function get<T = any, R = any>(url: string) {
    return await axios.get<T, R>(`${BASE_URL}${url}`);
}

async function post<T = any, R = any>(url: string, body: any) {
    return await axios.post<T, R>(`${BASE_URL}${url}`, body);
}

async function put<T = any, R = any>(url: string, body: any) {
    return await axios.put<T, R>(`${BASE_URL}${url}`, body);
}

const client = {
    delete: del,
    get,
    post,
    put
};

const Auth = {
    login: async (email: string, password: string) => {
        return await client.post<any, string>(Endpoint.Auth, { email, password });
    },
    register: async (name: string, surname: any, password: string, email: string) => {
        return await client.post<any, null>(Endpoint.User, {
            name,
            surname,
            password,
            email,
        });
    }
};

export default {
    Auth,
};
