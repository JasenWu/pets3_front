// 服务器地址
import { Post } from '../assets/js/ajax'

/**
 * 匹配公司标题
 */
export const insertContent = (params = {}) => {
  return Post('pets3_data/api/RestController.php', params)
}
