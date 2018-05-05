
import { uploadFile, ajaxSubmit, modalData, fileMaxSize, getBrowserInfo } from './model'
require('./style/index.less')
const $ = window.$
const formPage = $('#form-page')// 表单提交页面
const successPage = $('#success-page')// 文件上传成功页面

let selectedFile = $('#selectedFile')// 附件列表文件名

let modal = $('#modal')// 弹窗
let modalIcon = $('#modalIcon')// 弹窗icons
let modalMsg = $('#modalMsg')// 弹窗信息
let defer = 2000// 弹窗显示时长

// 上传的附件
let attachment = {
  fileName: '',
  id: '',
  url: ''
}

// 获取radio 的值
function getValue () {
  // method 1
  var radio = document.getElementsByName('businessExperienceFlag')
  let result = 1
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      result = radio[i].value
    }
  }
  return result
}

// 显示弹窗
function showDailog (type, msg) {
  function show (icon = modalData.success.icon, text = modalData.success.msg) { // 显示弹窗
    modalIcon.attr('src', icon)
    modalMsg.text(text)
    modal.show()
    let t = setTimeout(() => {
      modal.hide()
      clearTimeout(t)
    }, defer)
  }
  switch (type) {
    case 'success':
      show(modalData.success.icon, modalData.success.msg)
      break
    case 'failure':
      show(modalData.failure.icon, modalData.failure.msg)

      break

    case 'notPdf':

      show(modalData.notPdf.icon, modalData.notPdf.msg)
      break
    case 'toBig':
      show(modalData.toBig.icon, modalData.toBig.msg)
      break
    case 'commmon':
      show(modalData.toBig.icon, msg)
      break
  }
}
// 解析文件并上传
function handleUpload (obj) {
  let FileReader = window.FileReader
  let reader = new FileReader()
  reader.readAsDataURL(obj)
  reader.onload = () => {
    let fileName
    fileName = obj.name

    let dotIndex = fileName.lastIndexOf('.')
    let extName = fileName.substr(dotIndex + 1).toLowerCase()
    let fileBaseName = fileName.substr(0, dotIndex)
    let size = obj.size

    console.log('size', size)
    if (extName !== 'pdf') { // 不是要求的格式文件
      showDailog('notPdf')
      return
    }
    if (size > fileMaxSize) {
      showDailog('toBig')
      return
    }

    let sk = 'base64,'
    let result = reader.result
      .substr(reader.result.indexOf(sk) + sk.length)
    let params = {
      file: result,
      fileName: fileBaseName,
      fileType: extName
    }

    uploadFile(params, function (res) {
      let { retCode, retData } = res
      if (retCode === 0) { // 成功
        attachment = {
          fileName: fileBaseName,
          id: retData.id,
          url: retData.url
        }
        let html = `<span>${fileName}</span>`
        selectedFile.html(html)

        showDailog('success')
      }
    }, function () {
      showDailog('failure')
    })
  }
  reader.onerror = error => {
    console.log('error', error)
  }
}

// 初始化上传组件
function initUplodComponent (successBack) {
  const startUpload = $('#startUpload')// 上传组件
  const startUploadInput = $('#startUploadInput')// 上传的input type="file"控件
  startUpload.on('click', function () { // 绑定click操作
    startUploadInput.click()
  })
  startUploadInput.on('change', successBack)
}
// 响应式的成功页面尺寸
function getSuccessPageSize () {
  let winHeight = window.innerHeight + 'px'
  console.log('winHeight', winHeight)
  successPage.css({ height: winHeight })
  let val = '250px'
  successPage.find('.content-main').css({ paddingTop: val, 'paddingBottom': val })
}

// 初始化页面
function initPage (submitFile) {
  if (submitFile) {
    successPage.show()
    formPage.hide()
    getSuccessPageSize()
  } else {
    successPage.hide()
    formPage.show()
  }
}
// 定义提交事件
$.validator.setDefaults({
  submitHandler: function (form) {
    // alert("提交事件!");
    let params = {
      realName: $('#name').val(),
      mobile: $('#phone').val(),
      weChat: $('#weixin').val(),
      email: $('#email').val(),
      businessExperienceFlag: getValue(),
      education: $('#education').val(),
      educationSchool: $('#school').val(),
      description: '',
      fileId: attachment.id,// file id
      recommender:$('#referrer').val(),//推荐人
    }
    ajaxSubmit(params, function (res) {
      let { retCode, retMsg } = res

      if (retCode === 0) { // 成功
        initPage(true)// 初始化页面
      } else { // 失败
        console.log(retMsg)
        showDailog('commmon', retMsg)
      }
    }, function (res) {
      let { retMsg } = res
      showDailog(modalData.commonError.icon, retMsg)
    })
  }
})

// 手机号码验证增加
$.validator.addMethod('isMobile', function (value, element) {
  var length = value.length
  var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/
  return this.optional(element) || (length === 11 && mobile.test(value))
}, '请正确填写您的手机号码')

function updateBrowser () {
  $('#browser').show()
}

// 浏览器支持
function browserSupport () {
  let { browser, version } = getBrowserInfo()
  let support = false
  if (browser === 'IE' && version < 10) {
    updateBrowser()// 升级浏览器
  } else {
    support = true
  }
  return support
}

// 页面入口
$(document).ready(function () {
 
  //console.log('getBrowserInfo', getBrowserInfo())
 
  let support = browserSupport()// 浏览器支持
  if (support === false) { // 不支持直接返回
    return
  }
  initPage(false)// 初始化页面

  $('#form').validate({
    rules: {
      phone: {
        required: true,
        minlength: 11,
        // 自定义方法：校验手机号在数据库中是否存在
        // checkPhoneExist : true,
        isMobile: true
      }

    },
    messages: {
      phone: {
        required: '请输入手机号',
        minlength: '确认手机不能小于11个字符',
        isMobile: '请正确填写您的手机号码'
      }

    }
  })// 初始化表单险证
  initUplodComponent(function () { // 绑定click操作
    console.log('$(this)', $(this))
    let file = $(this)[0].files[0]// 只提交第一个附件
    handleUpload(file )
  })
})
