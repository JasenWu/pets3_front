// ajax封装

import axios from 'axios'
import jsonp from 'jsonp'

// import {
//   Message
// } from 'element-ui'

/**
 * 获取真实接口地址
 * @param url
 */
export const realUrl = (url) => {
  if (url) {
    return 'http://localhost/' + url
  }

  return url
}

const deepObjectToPostParams = (data, keyPre = '', opt = {}) => {
  let q = ''
  for (let i in data) {
    let pref = keyPre ? (keyPre + '[' + i + ']') : i

    if (opt.url && opt.url.indexOf('index/upload') === 0 && i === 'file') {
      q += pref + '=' + data[i] + '&'
      continue
    }

    if (typeof data[i] === 'object') {
      if (Array.isArray(data[i]) && data[i].length === 0 && opt.allowEmptyArray) {
        q += pref + `=&`
      } else {
        q += deepObjectToPostParams(data[i], pref, opt)
      }
    } else {
      q += pref + '=' + encodeURIComponent(data[i]) + '&'
    }
  }
  return q
}

/**
 * 发起post请求
 * @param oldUrl 请求地址
 * @param data 请求参数
 * @param ajaxData 附加ajax配置
 * @constructor
 */
export const Post = (oldUrl, data = {}, ajaxData = {}) => {
  let url = realUrl(oldUrl)
  console.log('url', url)

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
      // withCredentials: true,
      responseType: 'json',
      timeout: 60000,
      transformRequest: [function (data, headers) {
        let q = deepObjectToPostParams(data, '', {
          url: oldUrl,
          allowEmptyArray: ajaxData.allowEmptyArray || false
        })
        q = q.substr(0, q.length - 1)
        console.log('q', q)
        return q
      }],
      ...ajaxData
    })
      .then(({
        data,
        status
        // message
      }) => {
        if (status === 0) {
          // doTip(data, ajaxData)
          return resolve(data)
        } else {
          // Message({
          //   type: 'error',
          //   message: (message || '服务器错误') + ' ' + url
          // })
          return reject(status)
        }
      })
      .catch((err) => {
        // Message({
        //   type: 'error',
        //   message: (err.message || '服务器错误') + ' ' + url
        // })
        return reject(err)
      })
  })
}

/**
 * 发起get请求
 * @param url 请求地址
 * @param data 请求参数
 * @param ajaxData 附加ajax配置
 * @constructor
 */
export const Get = (oldUrl, data = {}, ajaxData = {}) => {
  let url = realUrl(oldUrl)

  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: (url),
      params: data,
      // withCredentials: true,
      responseType: 'json',
      timeout: 60000,
      ...ajaxData
    })
      .then(({
        data,
        code
        // message
      }) => {
        if (code === 0) {
          // doTip(data, ajaxData)
          return resolve(data)
        } else {
          // Message({
          //   type: 'error',
          //   message: (message || '服务器错误') + ' ' + (url)
          // })
          return reject(status)
        }
      })
      .catch((err) => {
        // Message({
        //   type: 'error',
        //   message: (err.message || '服务器错误') + ' ' + (url)
        // })
        return reject(err)
      })
  })
}

/**
 * 发起jsonp请求
 * @param url 请求地址
 * @param ajaxData 附加ajax配置
 * @constructor
 */
export const Jsonp = (url, ajaxData = {}) => {
  return new Promise((resolve, reject) => {
    jsonp(
      realUrl(url), {
        timeout: 60000,
        ...ajaxData
      },
      (err, data) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(data)
        }
      }
    )
  })
}

/**
 * 加载js/json文件
 * @param url
 */
export const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    let head = document.getElementsByTagName('head')[0]
    script.type = 'text/javascript'
    script.charset = 'UTF-8'
    script.src = url
    if (script.addEventListener) {
      script.addEventListener('load', () => {
        return resolve()
      }, false)
    } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', () => {
        var target = window.event.srcElement
        if (target.readyState === 'loaded') {
          resolve()
        }
      })
    }
    head.appendChild(script)
  })
}
