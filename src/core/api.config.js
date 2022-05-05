export const APICONFIG = {
  user: {
    // 登录
    login: '/v1_0/authorizations',
    // 用户信息
    userInfo: '/v1_0/user',
    // 上传头像
    uploadAvatar: '/v1_0/user/photo',
    // 获取用户个人资料
    userProFile: '/v1_0/user/profile',
    // 更新用户个人资料
    updateUserProFile: '/v1_0/user/profile'
  },
  home: {
    // 用户选择的标签
    userChannel: '/v1_0/user/channels',
    // 所有的频道
    allChannel: '/v1_0/channels',
    // 更新频道
    updateChannels: '/v1_0/user/channels',
    // 移除频道
    removeTheChannels: '/v1_0/user/channels/',
    // 查询某频道下的文章列表
    getAllArticleList: '/v1_0/articles',
    // 文章详情
    articleDetailApi: '/v1_0/articles',
    // 取消关注
    userUnFollowedApi: '/v1_0/user/followings',
    // 关注
    userFollowedApi: '/v1_0/user/followings'
  }
}
