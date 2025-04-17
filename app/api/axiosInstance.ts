import axios from "axios";

export const apiInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 1000,
});

// Add a request interceptor
apiInstance.interceptors.request.use(function (config) {
    // Add API key to every request
    config.params = {...config.params, api_key: process.env.NEXT_PUBLIC_API_KEY};
    return config;
}, function (error) {
    return Promise.reject(error);
});