import axios from "axios";

export const Api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

Api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

//instance.interceptors.response

Api.interceptors.response.use(
    (response) => {
        //const url = response.config.url;

        //setLocalStorageToken(token);
        return response;
    },
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            //(`unauthorized :)`);
            localStorage.removeItem("persist:root");
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);
