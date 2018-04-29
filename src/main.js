var $ = require("jquery");
require('./style/index.less');
require('./style/style.css');
import { x } from './test';
 
$(document).ready(function () {
    $('body').html('<p class="p">testddsfdsfsdf</p>')
    $("p").click(function () {
        alert(x);
        $(this).hide();
        setTimeout(() => {
            $(this).show();
        }, 2000)
    });
});