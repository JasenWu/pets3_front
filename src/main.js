
require('./style/index.less');
require('./style/style.css');
import { x } from './test';
 
let submitFile = false;//是否提交过资料
let formPage = $('#form-page');
let successPage = $("#success-page");

$(document).ready(function () {
    //$('body').html('<p class="p">testddsfdsfsdf</p>')
    if(submitFile){
        successPage.show();
    }else{
        successPage.hide();
    }
    $("p").click(function () {
        alert(x);
        $(this).hide();
        setTimeout(() => {
            $(this).show();
        }, 2000)

        
    });
});