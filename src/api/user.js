import { APICONFIG } from '@/core/api.config'
import request from '@/utils/request'

export function login ({ mobile, code }) {
  return request({
    url: APICONFIG.user.login,
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
