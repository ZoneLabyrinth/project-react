import axios from 'axios'
import envconfig from './envconfig';
import { Toast } from 'antd-mobile'


export default class Server {
    axios(method,url, params) {
        
        return new Promise((resolve, reject) => {
            if (typeof params !== 'object') params = {}
            let config = {
                url,
                method,
                baseURL: envconfig.baseURL,
                // `headers` are custom headers to be sent
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                // params,
                // `timeout` specifies the number of milliseconds before the request times out.
                // If the request takes longer than `timeout`, the request will be aborted.
                timeout: 5000,

                // `withCredentials` indicates whether or not cross-site Access-Control requests
                // should be made using credentials
                withCredentials: false, // default

                // `validateStatus` defines whether to resolve or reject the promise for a given
                // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
                // or `undefined`), the promise will be resolved; otherwise, the promise will be
                // rejected.
                validateStatus: function (status) {
                    return status >= 200 && status < 300; // default
                },
            }

            axios.interceptors.request.use(config => {
                //使用JWT情况
                // if(localStorage.token){
                //     config.headers.Authorization = `Bearer ${localStorage.token}`
                // }
                return config
            })

            axios.interceptors.response.use(res => {
                return res
            }, err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 400:
                            Toast.fail('400,错误的请求', 1)
                            break;
                        case 401:
                            Toast.fail('401,未授权', 1)
                            break;
                        case 404:
                            Toast.fail('404,未找到接口', 1)
                            break;
                        case 401:
                            Toast.fail('405,不支持该请求方式', 1)
                            break;
                        case 500:
                            Toast.fail('500,服务器错误', 1)
                            break;
                        case 502:
                            Toast.fail('502,网管错误', 1)
                            break;
                    }
                }
                return reject
            })

            axios.request(config).then(res => {
                resolve(res.data)
            },err=>{
                if(err.response){
                    reject(err.response.data)
                }else{
                    Toast.fail('请求超时，请重试',1)
                    reject(err)
                }
            })
        })
    }
}
