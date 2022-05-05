<template>
  <div>
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 文章--等待加载中 -->
    <van-loading
      color="#55C7FB"
      v-if="Object.keys(artObj).length === 0"
    >
      文章加载中...
    </van-loading>
    <div v-else>
      <!-- 文章信息区域 -->
      <div class="article-container">
        <!-- 文章标题 -->
        <h1 class="art-title">{{ artObj.title }}</h1>
        <!-- 用户信息 -->
        <van-cell
          center
          :title="artObj.aut_name"
          :label="formatDate(artObj.pubdate)"
        >
          <template #icon>
            <img
              :src="artObj.aut_photo"
              alt=""
              class="avatar"
            />
          </template>
          <template #default>
            <div>
              <van-button
                type="info"
                size="mini"
                v-if="artObj.is_followed === true"
                @click="followedFn(true)"
              >已关注</van-button>
              <van-button
                plain
                icon="plus"
                type="info"
                size="mini"
                v-else
                @click="followedFn(false)"
              >关注</van-button>
            </div>
          </template>
        </van-cell>

        <!-- 分割线 -->
        <van-divider></van-divider>

        <!-- 文章内容 -->
        <div
          class="art-content"
          v-html="artObj.content"
        ></div>

        <!-- 分割线 -->
        <van-divider>End</van-divider>

        <!-- 点赞(文章) -->
        <!-- attitude:  -1: 无态度，0-不喜欢，1-点赞 -->
        <div class="like-box">
          <van-button
            icon="good-job"
            type="danger"
            size="small"
            v-if="artObj.attitude === 1"
            @click="loveFn(true)"
          >已点赞</van-button>
          <van-button
            icon="good-job-o"
            type="danger"
            plain
            size="small"
            v-else
            @click="loveFn(false)"
          >点赞</van-button>
        </div>
        <!-- 文章评论部分 -->
      </div>
    </div>
  </div>
</template>

<script>
import { articledetail, userFollowed, userUnFollowed } from '@/api/home'
import { timeAgo } from '@/utils/date.js'
export default {
  data () {
    return {
      artObj: {},
      formatDate: timeAgo
    }
  },
  created () {
    articledetail({ artId: this.$route.query.art_id }).then(res => {
      this.artObj = res
    })
  },
  methods: {
    // 关注/取关 -> 作者
    // 注意: 每个登录的手机号, 都维护着自己的关注列表
    // 强烈建议: 重新用自己手机号登录, 不要都用138888888, 会互相影响
    async followedFn (bool) {
      if (bool === true) {
        // 取关接口
        this.artObj.is_followed = false
        await userUnFollowed({ target: this.artObj.aut_id })
      } else {
        // 关注接口
        this.artObj.is_followed = true
        await userFollowed({ target: this.artObj.aut_id })
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}

// 加载中居中样式
.van-loading {
  text-align: center;
  padding-top: 46px;
}
</style>
