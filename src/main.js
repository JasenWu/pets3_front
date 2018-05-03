
require('./style/index.less');
import { host, uploadFile, ajaxSubmit, modalData } from './model';

const formPage = $('#form-page');//表单提交页面
const successPage = $("#success-page");//文件上传成功页面

let selectedFile = $('#selectedFile');//附件列表文件名

let modal = $('#modal');//弹窗
let modalIcon = $('#modalIcon');//弹窗icons
let modalMsg = $('#modalMsg');//弹窗信息
let defer = 2000;//弹窗显示时长
//上传的附件
let attachment = {
    fileName: '',
    id: "",
    url: "",
};

//获取radio 的值
function getValue() {
    // method 1   
    var radio = document.getElementsByName("businessExperienceFlag");
    let result = 1;
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {

            result = radio[i].value;
        }
    }
    return result;
}

//显示弹窗
function showDailog(type) {
    if (type == 'success') {
        modalIcon.attr('src', modalData.success.icon);
        modalMsg.text(modalData.success.msg);
        modal.show();
        let t = setTimeout(() => {
            modal.hide();
            clearTimeout(t);
        }, defer)
    } else {
        modalIcon.attr('src', modalData.failure.icon);
        modalMsg.text(modalData.failure.msg);
        modal.show();
        let t = setTimeout(() => {
            modal.hide();
            clearTimeout(t);
        }, defer)
    }

}
//解析文件并上传
function handleUpload(obj) {
    let reader = new FileReader();
    reader.readAsDataURL(obj);
    reader.onload = () => {
        let fileName;
        fileName = obj.name;

        let dotIndex = fileName.lastIndexOf(".");
        let extName = fileName.substr(dotIndex + 1).toLowerCase();
        let fileBaseName = fileName.substr(0, dotIndex);
        console.log("extName", extName);
        let sk = "base64,";
        let result = reader.result
            .substr(reader.result.indexOf(sk) + sk.length);
        let params = {
            file: result,
            fileName: fileBaseName,
            fileType: extName
        };

        uploadFile(params, function (res) {
            let { retCode, retData, retMsg } = res;
            if (retCode == 0) {//成功
                attachment = {
                    fileName: fileBaseName,
                    id: retData.id,
                    url: retData.url,
                }
                let html = `<span>${fileName}</span>`
                selectedFile.html(html);

                showDailog('failure');

            }
        }, function () {
            showDailog('failure');
        })
    };
    reader.onerror = error => {
        console.log("error", error);
    };
}

//初始化上传组件
function initUplodComponent(successBack) {
    const startUpload = $("#startUpload");//上传组件
    const startUploadInput = $("#startUploadInput");//上传的input type="file"控件
    startUpload.on("click", function () {//绑定click操作
        startUploadInput.click();
    })
    startUploadInput.on("change", successBack)
}
//响应式的成功页面尺寸
function getSuccessPageSize() {
    let winHeight = window.innerHeight + 'px';
    console.log('winHeight', winHeight);
    successPage.css({ height: winHeight });
    let val = '250px';
    successPage.find('.content-main').css({ paddingTop: val, 'paddingBottom': val });
}

//初始化页面
function initPage(submitFile) {
    if (submitFile) {
        successPage.show();
        formPage.hide();
        getSuccessPageSize();
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
            education: $('#education').val(),
            educationSchool: $("#school").val(),
            description: "",
            fileId: attachment.id,//file id

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
//页面入口
$(document).ready(function () {
    initPage(false);//初始化页面
    $("#form").validate();//初始化表单险证
    initUplodComponent(function () {//绑定click操作
        console.log("$(this)", $(this));
        let file = $(this)[0].files[0];//只提交第一个附件
        handleUpload(file);
    });
});
