import Axios from 'axios'

Axios.defaults.withCredentials = true

export function request(config) {
    const instance = Axios.create({
        baseURL: 'http://localhost:4200',
        timeout: 5000,
    })
    instance.interceptors.request.use(config => {
        return config
    }, onerror => {
        console.log(`请求发送出错:${onerror}`)
    })
    instance.interceptors.response.use(res => {
        return res.data
    }, onerror => {
        console.log(`请求响应出错:${onerror}`)
    })
    return instance(config)
}