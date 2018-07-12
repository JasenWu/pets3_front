import {Get, Post} from '@assets/js/ajax'

/** 登录 */
export const login = (params = {}) => {
  return Post('login/login', params)
}

/** 退出 */
export const logout = () => {
  return Post('login/logout')
}

/** 获取用户信息 */
export const getUser = () => {
  return Get('login/getuser')
}

// 获取登录地址
export const getLoginUrl = (url = null) => {
  return Get('login/create-wx-authorize-url', {
    redirectUrl: encodeURIComponent(url)
  })
}
