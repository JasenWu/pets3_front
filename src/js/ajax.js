const $ = window.$
// Post请求
export const Post = function (param) {
  let { url, params, successBack, errorBack } = param
  $.ajax({
    type: 'POST',
    url: url,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    data: params,
    success: function (res) {
      successBack(res)
    },
    error: function (err) {
      if (errorBack) {
        errorBack(err)
      }
    }
  })
}
