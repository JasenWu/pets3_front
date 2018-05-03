// 服务器地址
import { Post } from './js/ajax'

export let host = 'http://192.168.87.201:8089/'// 服务器地址
// 学历列表
export const educationList = ['', '小学', '初中', '中专', '高中', '大专', '本科', '硕士', '博士', '博士后']// 异步工具

export let modalData = {
  success: {
    icon: './img/success-icon.png',
    msg: '上传附件成功'
  },
  failure: {
    icon: './img/error-icon.png',
    msg: '上传附件失败'
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
