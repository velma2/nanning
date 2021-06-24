import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import merge from 'lodash/merge'

const http = axios.create({
    timeout: 1000 * 30,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    }
})

  /**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    let authorization = Vue.cookie.get('Authorization')
    console.log('Authorization', authorization)
    if(authorization){
        config.headers['Authorization'] = authorization // 请求头带上token
        // config.headers['Authorization'] = 'bearer ' + Vue.cookie.get('Authorization') // 请求头带上token
    }
    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    // response.status=200
    if(response.data&&response.data.code===401){//401,token失效
        // console.log(response.data.url)
            window.location.replace(response.data.url);
    }
    //Nprogress.done()
    return response
}, error => {

    console.log('异常信息-----------------------------------------start')
    let resMsg = "请求异常"
    console.log(error)
    if(error.response && error.response.data){
        if(error.response&&error.response.code===401){//401,token失效
            // console.log(response.url)
            location.herf = error.response.url;
        }else if(error.response.data&&error.response.data.code===401){//401,token失效
            // console.log(response.data.url)
            location.herf = error.response.data.url;
        }else if(error.response.data.message){
            resMsg = error.response.data.message
        }
    }
    Vue.prototype.$message.error(resMsg)
    console.log('异常信息-------------------------------------------end')

  return Promise.reject(error)
})


/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
 http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
      't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
  }
  
  /**
   * post请求数据处理
   * @param {*} data 数据对象
   * @param {*} openDefultdata 是否开启默认数据?
   * @param {*} contentType 数据格式
   *  json: 'application/json; charset=utf-8'
   *  form: 'application/x-www-form-urlencoded; charset=utf-8'
   */
  http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
      't': new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
  }
  
  export default http
