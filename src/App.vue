<template>
  <div>
    <keep-alive exclude="Detail,UserInfo">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {

}
</script>
