<template>
  <div class="user-edit-container">
    <van-nav-bar
      title="编辑资料"
      fixed
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell
        title="头像"
        is-link
        center
      >
        <template>
          <van-image
            round
            :src="$store.state.userPhoto"
            class="avatar"
            @click="changeAvatar"
          />
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="userProObj.name"
        @click="changeNickName"
      ></van-cell>
      <van-cell
        title="生日"
        is-link
        :value="userProObj.birthday"
        @click="changeBirthday"
      ></van-cell>
    </van-cell-group>
    <!-- 昵称的弹窗 -->
    <van-dialog
      v-model="show"
      title="昵称修改"
      show-cancel-button
      @confirm="closeDialog"
    >
      <van-field
        v-model="inputUserName"
        size="large"
        maxlength="11"
        :clearable="true"
        placeholder="请输入昵称"
      />
    </van-dialog>
    <!-- 时间选择 -->
    <van-popup round v-model="dateTimePickerShow" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="dateCancelFn"
        @confirm="confirmFn"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProFile, updateUserProFile, uploadUserAvatar } from '@/api/user'
import { mapMutations } from 'vuex'
import { Toast } from 'vant'
import { formatDate } from '@/utils/date.js'
export default {
  name: 'UserInfo',
  data () {
    return {
      userProObj: {},
      show: false,
      inputUserName: '',
      dateTimePickerShow: false,
      currentDate: new Date(),
      minDate: new Date(1920, 0, 1),
      maxDate: new Date()
    }
  },
  async created () {
    const res = await getUserProFile()
    this.userProObj = res
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO', 'SET_NICKNAME']),
    // 点击头像的时候
    changeAvatar () {
      this.$refs.iptFile.click() // JS模拟标签的事件触发, 为了让input[file]文件选择窗口出现
    },
    // 选择图片回调
    async onFileChange (e) {
      if (e.target.files.length === 0) return
      console.log(e.target.files[0])
      // 创建FormData对象
      const imgFd = new FormData()
      imgFd.append('photo', e.target.files[0])
      // 上传图片
      const res = await uploadUserAvatar(imgFd)
      if (res.photo.length > 0) {
        Toast.success('上传成功')
        // 图片上传成功后, 同步到vuex中
        this.SET_USERPHOTO(res.photo)
      }
    },
    // 修改昵称
    changeNickName () {
      this.show = true
      this.inputUserName = this.userProObj.name
    },
    // 确认修改昵称
    async closeDialog () {
      const res = await updateUserProFile({ name: this.inputUserName })
      if (res === null) {
        Toast.success('修改成功')
        this.userProObj.name = this.inputUserName
        this.SET_NICKNAME(this.inputUserName)
      }
    },
    // 生日时间选择
    changeBirthday () {
      this.currentDate = new Date(this.userProObj.birthday)
      this.dateTimePickerShow = true
    },
    // 确定时间选择
    dateCancelFn () {
      this.dateTimePickerShow = false
    },
    async confirmFn (value) {
      this.dateTimePickerShow = false
      const res = await updateUserProFile({ birthday: formatDate(value) })
      if (res === null) {
        Toast.success('修改成功')
        this.userProObj.birthday = formatDate(value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
