import {
  Message,
  MessageBox,
  Loading
} from 'element-ui'

const fn1 = {
  toast (params) {
    params = Object.assign({}, params, {
      customClass: 'global-ui-toast'
    })
    if (params.duration === undefined) {
      params.duration = 1500
    }
    return Message(params)
  },
  alert (...params) {
    let sp = {
      customClass: 'global-ui-messageBox',
      closeOnClickModal: true,
      dangerouslyUseHTMLString: true
    }
    let hasObj = false
    for (let v of params) {
      if (typeof v === 'object') {
        hasObj = true
        v = Object.assign(v, sp)
      }
    }
    if (!hasObj) {
      params.push(sp)
    }
    return MessageBox.alert.call({}, ...params)
  },
  confirm (...params) {
    let sp = {
      customClass: 'global-ui-messageBox',
      closeOnClickModal: true,
      dangerouslyUseHTMLString: true
    }
    let hasObj = false
    for (let v of params) {
      if (typeof v === 'object') {
        hasObj = true
        v = Object.assign(v, sp)
      }
    }
    if (!hasObj) {
      params.push(sp)
    }
    return MessageBox.confirm.call({}, ...params)
  },
  loading: {
    open (str = null) {
      let params = {
        fullscreen: true,
        background: 'transparent',
        customClass: 'gloabl-ui-loading'
      }
      if (str) {
        params.text = str
      }
      return Loading.service(params)
    }
  }
}

export default fn1
