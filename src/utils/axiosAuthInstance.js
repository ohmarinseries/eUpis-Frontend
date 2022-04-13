import axios from "axios";
import url from "../api-urls";


const instance = axios.create({
    baseURL:url
});


instance.interceptors.request.use(
    async (config) => {
        config.headers = {
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        };
        return config;

},  (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const request = error.config;
        if (error.response.status === 403 || error.response.status === 401){
            request._retry = true;
           await axios.post(url + '/auth/jwt/refresh/', {'refresh' : localStorage.getItem('refresh')})
                      .then((response) => {
                          console.log(response.data.access);
                          localStorage.setItem('access', response.data.access);
                          request.headers.Authorization = 'Bearer ' + localStorage.getItem('access')
                          return axios(request)
                      })

            return Promise.reject(error);
        }
    }
)

export default instance;