<template>
  <div>
    <NavBar title="登录" />
    <div>
      <Form
        @submit="onSubmit"
        show-error
      >
        <Field
          v-model="user.mobile"
          type="number"
          name="mobile"
          label="手机号"
          required
          :rules="[{ required: true, message: '请填写手机号' }]"
        >
        </Field>
        <Field
          v-model="user.code"
          type="password"
          name="code"
          label="密码"
          required
          :rules="[{ required: true, message: '请填写密码', pattern: /^\d{6}$/ }]"
        />
        <div style="margin: 16px">
          <Button
            round
            block
            type="info"
            native-type="submit"
            :disabled="isLoading"
            :loading="isLoading"
            loading-text="正在登录中"
          >提交</Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button } from 'vant'
import { login } from '@/api/user'
import { setToken } from '@/utils/token'
import { setStorage } from '@/utils/storage'
export default {
  components: {
    NavBar,
    Form,
    Field,
    Button
  },
  data () {
    return {
      user: {
        mobile: '18685074605',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit (values) {
      this.isLoading = true
      const res = await login({
        mobile: values.mobile,
        code: values.code
      }).finally(() => {
        this.isLoading = false
      })
      setToken(res.token)
      setStorage('refresh_token', res.refresh_token)
      this.$router.replace({
        path: this.$route.query.path || '/layout'
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
