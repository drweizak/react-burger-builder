import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burguer-builder-1c3a7.firebaseio.com'
});

export const reqInterceptor = instance.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});

export const resInterceptor = instance.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export default instance;