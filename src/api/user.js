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

export function getUserInfo () {
  return request({
    url: APICONFIG.user.userInfo
  })
}

export function uploadUserAvatar (fd) {
  return request({
    url: APICONFIG.user.uploadAvatar,
    method: 'PATCH',
    data: fd
  })
}

export function getUserProFile () {
  return request({
    url: APICONFIG.user.userProFile
  })
}

export function updateUserProFile (data) {
  return request({
    url: APICONFIG.user.updateUserProFile,
    method: 'PATCH',
    data
  })
}
