// 服务器地址
import { Post } from './js/ajax'

export let host = 'http://192.168.87.201:8089/'// 服务器地址
// 学历列表
export const educationList = ['', '小学', '初中', '中专', '高中', '大专', '本科', '硕士', '博士', '博士后']// 异步工具

export const fileMaxSize = 1024 * 1024 * 10// 10M

export let modalData = {
  success: {
    icon: './img/success-icon.png',
    msg: '上传附件成功'
  },
  failure: {
    icon: './img/error-icon.png',
    msg: '上传附件失败'
  },
  notPdf: {
    icon: './img/error-icon.png',
    msg: '只支持pdf类型的文件上传'
  },
  toBig: {
    icon: './img/error-icon.png',
    msg: '文件大小超过了10M'
  },
  commonError: {
    icon: './img/error-icon.png',
    msg: '错误'
  }

}

// 异步提交表单
export function ajaxSubmit (params, successBack, errorBack) {
  let url = host + 'project/project/website-submit-apply'
  Post({
    url: url,
    params: params,
    successBack: successBack,
    errorBack: errorBack
  })
}
// 上传文件
export function uploadFile (params, successBack, errorBack) {
  let url = host + 'index/upload'
  Post({
    url: url,
    params: params,
    successBack: successBack,
    errorBack: errorBack
  })
}

// 获取浏览器信息
export function getBrowserInfo () {
  let userAgent = navigator.userAgent
  let rMsie = /(msie\s|trident.*rv:)([\w.]+)/
  let rFirefox = /(firefox)\/([\w.]+)/
  let rOpera = /(opera).+version\/([\w.]+)/
  let rChrome = /(chrome)\/([\w.]+)/
  let rSafari = /version\/([\w.]+).*(safari)/

  function uaMatch (ua) {
    let match
    match = rMsie.exec(ua)
    if (match != null) {
      return { browser: 'IE', version: match[2] || '0' }
    }
    match = rFirefox.exec(ua)
    if (match != null) {
      return { browser: match[1] || '', version: match[2] || '0' }
    }
    match = rOpera.exec(ua)
    if (match != null) {
      return { browser: match[1] || '', version: match[2] || '0' }
    }
    match = rChrome.exec(ua)
    if (match != null) {
      return { browser: match[1] || '', version: match[2] || '0' }
    }
    match = rSafari.exec(ua)
    if (match != null) {
      return { browser: match[2] || '', version: match[1] || '0' }
    }
    if (match != null) {
      return { browser: '', version: '0' }
    }
  }
  let browserMatch = uaMatch(userAgent.toLowerCase())
  let browserDic = []
  if (browserMatch.browser) {
    browserDic['browser'] = browserMatch.browser
    browserDic['version'] = browserMatch.version
  } else {
    browserDic['browser'] = ''
    browserDic['version'] = ''
  }
  return browserDic
}
