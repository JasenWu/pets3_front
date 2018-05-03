
require('./style/index.less');

import { host, attachment, getValue, uploadFile, handleUpload } from './model';


const formPage = $('#form-page');//表单提交页面
const successPage = $("#success-page");//文件上传成功页面



//初始化页面
function initPage(submitFile) {
    if (submitFile) {
        successPage.show();
        formPage.hide();
    } else {
        successPage.hide();
        formPage.show();
    }
}
 
 
$.validator.setDefaults({
    submitHandler: function (form) {
        //alert("提交事件!");
        let params = {
            realName: $("#name").val(),
            mobile: $("#phone").val(),
            weChat: $("#weixin").val(),
            email: $("#email").val(),
            businessExperienceFlag: getValue(),
            education: 1,
            educationSchool: $("#school").val(),
            description: "",
            fileId: 22

        }
        ajaxSubmit(params, function (res) {
            let { retCode, retData, retMsg } = res;
            console.log("retCode", retCode, retMsg, retData);
            if (retCode === 0) {//成功
                initPage(true);//初始化页面
            } else {//失败

            }

        });
    }
});

$(document).ready(function () {
    initPage(false);//初始化页面
    $("#form").validate();

    $("#test").on("click", function () {
        getValue();
    })

    const startUpload = $("#startUpload");//上传组件
    const startUploadInput = $("#startUploadInput");//上传的input type="file"控件
    startUpload.on("click", function () {
        startUploadInput.click();
    })
    startUploadInput.on("change", function () {
        console.log("$(this)",$(this));
        let file = $(this)[0].files[0];//只提交第一个附件
        handleUpload(file);
    })
});