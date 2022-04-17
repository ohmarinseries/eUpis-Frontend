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
        let request = error.config;
        if (error.response.status === 401 && !request._retry){
            request._retry = true;
            //DON'T JUDGE ME
           await axios.post(url + '/auth/jwt/refresh/', {'refresh' : localStorage.getItem('refresh')})
                      .then((response) => {
                          localStorage.setItem('access', response.data.access);
                          request.headers.Authorization = 'Bearer ' + localStorage.getItem('access')
                          if(request.method === 'get'){
                              window.location.reload();
                          }
                          else{
                              axios(request).then(() => {
                                  window.location.reload();
                              });
                          }

                      })
                      .catch((err) => {
                          if(err.response.status === 401){
                              window.location = '/dashboard-login';
                          }
                      })
            return Promise.reject(error.response.data);
        }
    }
)

export default instance;