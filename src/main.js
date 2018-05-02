var $ = require('jquery')
require('./style/index.less')
require('./style/style.css')

$(document).ready(function () {
  $('body').html('<p class="p">testddsfdsfsdf</p>')
  $('p').click(function () {
    $(this).hide()
    setTimeout(() => {
      $(this).show()
    }, 2000)
    let root = document.getElementsByName('body')

    document.body.appendChild(root )
  })
})