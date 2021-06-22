import axios from 'axios'

export function request(config) {
    return new Promise((resolve, reject) => {
        // 1.创建axios的实例
        const instance = axios.create({
            baseURL:"http://152.136.185.210:7878/api/m5",
            timeout:200
        })
        // axios的拦截器
        // 一，请求拦截
        instance.interceptors.request.use(config => {
            //1.拦截config中的一些不符合服务器要求的信息
            //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
            //3.某些网络请求(比如登录(token))，必须携带一些特殊的信息
            return config
        },err => {
            console.log(err);
        })
        // 一，请求拦截
        instance.interceptors.response.use(res => {
            return res
        },err => {
            console.log(err)
        })

        //发送真正的网络请求
        instance(config)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}