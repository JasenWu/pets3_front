//服务器地址
export let host = 'http://192.168.87.201:8089/';//服务器地址
//学历列表
export const educationList = ['', '小学', '初中', '中专', '高中', '大专', '本科', '硕士', '博士', '博士后'];

//上传的附件
export let attachment = {
  fileName: '',
  id: "",
  url: "",
}; 

//获取radio 的值
export function getValue() {
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

//上传文件
export function uploadFile(params, callBack) {
  $.ajax({
      type: "POST",
      url: host + 'index/upload',
      crossDomain: true,
      xhrFields: {
          withCredentials: true
      },
      data: params,
      success: function (res) {
          callBack(res);
      },
      error: function (err) {
          console.log(err);
      }
  });
}


//解析文件并上传
export function handleUpload(obj) {
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
              console.log('attachment', attachment);
          }

      })
  };
  reader.onerror = error => {
      console.log("error", error);
  };
}


//异步提交表单
export function ajaxSubmit(params, callBack) {
  $.ajax({
      type: "POST",
      url: host + 'project/project/website-submit-apply',
      crossDomain: true,
      xhrFields: {
          withCredentials: true
      },
      data: params,
      success: function (res) {
          callBack(res);
      },
      error: function (err) {
          console.log(err);
      }
  });
}