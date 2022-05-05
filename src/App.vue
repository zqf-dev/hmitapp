<template>
  <div>
    <keep-alive exclude="user,detail,userInfo">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {

}
</script>
