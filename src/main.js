var $ = require("jquery");
require('./index.less');
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