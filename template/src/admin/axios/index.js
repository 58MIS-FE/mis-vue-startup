import axios from 'axios'
import Qs from 'qs'
let url = ''
process.env.NODE_ENV == 'development' ?  url = '127.0.0.1' : ''
     
export const baseUrl = `${url}`
//请求前
axios.interceptors.request.use(
    config => {
        config.transformRequest = (data)=>{
            data = Qs.stringify(data);
            return data
        }
        config.withCredentials = true
            return config
        },function(error){
            return Promise.reject(error)
        }
        );
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    console.log(error,'error')
});

