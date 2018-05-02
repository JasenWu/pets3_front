
require('./style/index.less');
 
import { x } from './test';
 
let submitFile = true;//是否提交过资料
let formPage = $('#form-page');
let successPage = $("#success-page");

//初始化页面
function initPage(){
    if(submitFile){
        successPage.show();
        formPage.hide();
    }else{
        successPage.hide();
        formPage.show();
    }
}

$(document).ready(function () {
    initPage();//初始化页面
    
});