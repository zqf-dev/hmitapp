import { APICONFIG } from '@/core/api.config'
import request from '@/utils/request'

export function getUserChannel () {
  return request({
    url: APICONFIG.home.userChannel
  })
}

export function getAllChannel () {
  return request({
    url: APICONFIG.home.allChannel
  })
}

export function updateChannels ({ channels }) {
  return request({
    url: APICONFIG.home.allChannel,
    method: 'POST',
    data: {
      channels
    }
  })
}

export function removeTheChannel ({ channelId }) {
  return request({
    url: APICONFIG.home.allChannel + `/${channelId}`,
    method: 'DELETE'
  })
}

export function getAllArticleList ({ channelId, timestamp }) {
  return request({
    url: APICONFIG.home.getAllArticleList,
    method: 'GET',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}

export function articledetail ({ artId }) {
  return request({
    url: APICONFIG.home.articleDetailApi + `/${artId}`
  })
}

export function userUnFollowed ({ target }) {
  return request({
    url: APICONFIG.home.userUnFollowedApi + `/${target}`,
    method: 'DELETE'
  })
}

export function userFollowed ({ target }) {
  return request({
    url: APICONFIG.home.userFollowedApi,
    method: 'POST',
    data: {
      target: target
    }
  })
}
