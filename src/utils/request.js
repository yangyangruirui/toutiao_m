/**
 * axios 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn', //基础路径
})

//请求拦截器
request.interceptors.request.use(function(config) {
    //请求发起会走这里的代码
    //config:是本次请求的配置对象
    const { user } = store.state
        // console.log(user)
    if (user && user[0].token) {
        // console.log(1);
        config.headers.Authorization = `Bearer ${user[0].token}`
    }
    // console.log(config);
    // 注意：这里务必要返回config 否则请求就出不去了
    return config
}, function(error) {
    //如果请求出错 会进入这里
    return Promise.reject(error)
})

//相应拦截器

export default request