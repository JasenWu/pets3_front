// 服务器地址
import {
  Get,
  Post
} from '../assets/js/ajax'

export const insertRoles = (params = {}) => {
  return Post('pets3_data/api/RestController.php', params)
}

export const updateRoles = (params = {}) => {
  return Post('pets3_data/api/RestController.php', params)
}

export const getRoles = (params = {}) => {
  return Get('pets3_data/api/RestController.php', params)
}


