<template>
  <div>
    <van-nav-bar
      title="首页"
      fixed
    >
      <template v-slot:right>
        <van-icon
          name="search"
          size="20"
        />
      </template>
    </van-nav-bar>
    <div class="channel-con">
      <van-tabs
        v-model="channelId"
        @change="channelChangeFn"
        swipeable
        animated
        sticky
        offset-top="1.226667rem"
      >
        <van-tab
          v-for="item in userChannelList"
          :key="item.id"
          :title="item.name"
          :name="item.id"
        >
          <article-list :channelId="channelId"></article-list>
        </van-tab>
      </van-tabs>
      <van-icon
        name="plus"
        size="0.37333334rem"
        class="morechannel"
        @click="addChannel"
      />
    </div>
    <!-- 频道管理弹出层 -->
    <van-popup
      class="channel_popup"
      v-model="show"
    >
      <channel-edit
        :userList="userChannelList"
        :unCheckList="unCheckChannelList"
        @addChannelEV="addChannelFn"
        @removeChannelEV="removeChannelFn"
        @closeEV="closeFn"
        ref="editRef"
        v-model="channelId"
      >
      </channel-edit>
    </van-popup>
  </div>
</template>

<script>
import {
  getUserChannel,
  getAllChannel,
  updateChannels,
  removeTheChannel
} from '@/api/home.js'
import ChannelEdit from '@/components/ChannelEdit.vue'
import ArticleList from '@/components/ArticleList.vue'
export default {
  components: {
    ChannelEdit,
    ArticleList
  },
  computed: {
    unCheckChannelList () {
      return this.allChannelList.filter(
        (bigObj) =>
          this.userChannelList.findIndex((smallObj) => smallObj.id === bigObj.id) === -1
      )
    }
  },
  data () {
    return {
      channelId: 0,
      userChannelList: [],
      allChannelList: [],
      loading: false,
      show: false,
      channelScrollTObj: {}
    }
  },
  async created () {
    const userRes = await getUserChannel()
    this.userChannelList = userRes.channels

    const allRes = await getAllChannel()
    this.allChannelList = allRes.channels
  },
  // 方法
  methods: {
    addChannel: function () {
      this.show = true
    },
    // tabs切换的事件  ->  获取文章列表数据
    channelChangeFn () {
      this.$nextTick(() => {
        document.documentElement.scrollTop =
          this.channelScrollTObj[this.channelId]
        document.body.scrollTop = this.channelScrollTObj[this.channelId]
      })
    },
    // 添加频道
    async addChannelFn (channelObj) {
      this.userChannelList.push(channelObj)
      const newArr = this.userChannelList.filter((obj) => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj } // 拷贝(浅拷贝)
        delete newObj.name
        newObj.seq = index
        return newObj // 让map方法把新对象收集起来形成一个新数组
      })
      const res = await updateChannels({
        channels: theNewArr
      })
      console.log(res)
    },
    // 删除频道
    async removeChannelFn (channelObj) {
      const index = this.userChannelList.findIndex(
        (obj) => obj.id === channelObj.id
      )
      this.userChannelList.splice(index, 1)
      const res = await removeTheChannel({
        channelId: channelObj.id
      })
      console.log(res)
    },
    // 关闭弹出层
    closeFn () {
      this.show = false
      // 我要让内部的编辑状态回归false
      this.$refs.editRef.isEdit = false
    }
  },
  // 只有使用keep-alive的组件才有这2个生命周期
  activated () { // 切回来
    console.log(this.$route)
    window.addEventListener('scroll', this.scrollFn)
    // window和document, 监听网页滚动的事件
    // html标签获取scrollTop, 滚动的距离, 和设置滚动的位置
    // 立刻设置, 滚动条位置
    document.documentElement.scrollTop = this.$route.meta.scrollT
    document.body.scrollTop = this.$route.meta.scrollT
  },
  deactivated () { // 切走
    window.removeEventListener('scroll', this.scrollFn)
  }
  // 先切走了, 滚动条回到顶部, 才触发deactivated失焦, 所以拿不到滚动位置了
  // 测试
}
</script>

<style scoped lang="less">
.channel-con{
  padding-top: 45px;
}
/* // 设置 tabs 容器的样式 */
::v-deep .van-tabs__wrap {
  padding-right: 45px;
  background-color: #fff;
}
.morechannel {
  position: fixed;
  top: 46px;
  right: 8px;
  z-index: 99;
  width: 45px;
  height: 43.98px;
  line-height: 44px;
  background: rgba(255, 255, 255, 0.95);
  text-align: center;
}
.channel_popup {
  width: 100vw;
  height: 100vh;
}
</style>
