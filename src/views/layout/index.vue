<template>
  <div>
    <!-- 二级路由页面 -->
    <div class="home_container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 底部导航 -->
    <div>
      <van-tabbar v-model="active" route>
        <van-tabbar-item
          icon="wap-home-o"
          to="/layout/home"
        >首页</van-tabbar-item>
        <van-tabbar-item
          icon="contact"
          to="/layout/user"
        >我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>
.home_container {
  padding-bottom: 50px;
}
</style>
