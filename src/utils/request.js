/* eslint-disable indent */
import axios from 'axios'
import { Toast } from 'vant'
import { getToken, removeToken } from '@/utils/token'
import router from '@/router'

const mAxios = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 10000
})

// 请求拦截器
mAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 目标: 统一携带token
  // 判断本地有token再携带, 判断具体api/index.js里如果没有携带Authorization, 我在添加上去
  // 未定义叫undefined, null具体的值你得赋予才叫空
  // ?. 可选链操作符, 如果前面对象里没有length, 整个表达式原地返回undefined
  // 如果getToken()在原地有值token字符串, 才能调用length获取长度
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
mAxios.interceptors.response.use(response => {
  const res = response.data
  if (res.message !== 'OK') {
    Toast({
      message: res.message || 'fail',
      type: 'fail',
      duration: 2 * 1000
    })
    return Promise.reject(new Error(res.message || 'fail'))
  } else {
    return res.data
  }
},
error => {
    console.log('interceptors fail-----', error)
    const errorRes = error.response
    if (errorRes.status === 401) {
      // 不能使用this.$router (因为this不是vue组件对象无法调用$router)
      // 解决: this.$router为了拿到router路由对象, 所以直接去上面引入@/router下router对象
      // Notify({ type: 'warning', message: '身份已过期' })
      removeToken() // 先清除token, 才能让路由守卫判断失效, 放行我去登录页
      // 方式1: 强制跳转到登陆, 用户有感知
      // router.currentRoute 相当于 在vue文件内this.$route -> 当前路由对象信息
      // fullPath, 路由对象里完整路由路径#后面的一切
      router.replace(`/login?path=${router.currentRoute.fullPath}`)
    } else {
      Toast({
        message: errorRes.data.message,
        type: 'fail',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params, data, headers }) => {
   return mAxios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
   })
}
