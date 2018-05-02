
require('./style/index.less')
let $ = window.$
let submitFile = false// 是否提交过资料
let formPage = $('#form-page')
let successPage = $('#success-page')
const host = 'http://192.168.87.201:8089/'// 通过官网提交的项目申请
const api = host + 'project/project/website-submit-apply'// 通过官网提交的项目申请

// 初始化页面
function initPage () {
  if (submitFile) {
    successPage.show()
    formPage.hide()
  } else {
    successPage.hide()
    formPage.show()
  }
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

// 登录
function login (params = {userName: 'lujiansheng', password: 'Innotech2017'}) {
  $.ajax({
    type: 'POST',
    url: host + 'login/login',
    data: params,
    success: function (res) {
      console.log('res', res)
    }

  })
}

// 异步提交
function ajaxSubmit (params) {
  $.ajax({
    type: 'POST',
    url: api,
    data: params,
    success: function (res) {
      console.log('res', res)
    }

  })
}

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
      fileId: 22

    }
    console.log('params', params)

    ajaxSubmit(params)
  }
})
$(document).ready(function () {
  initPage()// 初始化页面
  $('#form').validate()
  login()
  $('#test').on('click', function () {
    getValue()
  })
})
