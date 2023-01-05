<template>
  <div class="login_container">
    <!-- 导航栏 -->
    <van-nav-bar class="page_nav_bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- end 导航栏 -->

    <!-- 登录表单 -->
    <!-- 校验规则 参考文档：https://vant-ui.github.io/vant/v3/#/zh-CN/form#rule-shu-ju-jie-gou -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-cell-group inset class="form-box">
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          left-icon="phone-o"
          type="number"
          maxlength="11"
          :rules="userformRules.mobile"
        />
        <van-field
          v-model="user.code"
          name="code"
          placeholder="请输入验证码"
          type="number"
          maxlength="6"
          :rules="userformRules.code"
        >
          <i slot="left-icon" class="toutiao toutiao_a-Icon_arrow-right"></i>
          <template #button>
            <!-- 点击表单中的普通按钮会出发表单的提交 为避免触发表单提交  可设置native-type为button -->
            <!-- time:倒计时时间 -->
            <van-count-down
              v-if="iscountdownShow"
              :time="1000 * 60"
              format="ss s"
              @finish="iscountdownShow = false"
            />
            <van-button
              v-else
              class="send-sms"
              round
              size="small"
              type="default"
              @click="onsubsms"
              native-type="button"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-box">
        <van-button class="login-btn" block type="default" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <p class="tishi">万能账号：13911111111</p>
    <p class="tishi">万能验证码：246810</p>
    <!-- end 登录表单 -->
  </div>
</template>

<script>
import { login, sendsms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: '',
      },
      userformRules: {
        mobile: [
          {
            required: true,
            message: '请填写用户名',
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式不正确',
          },
        ],
        code: [
          {
            required: true,
            message: '请填写用户名',
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确',
          },
        ],
      },
      //是否展示倒计时
      iscountdownShow: false,
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // console.log('submit', values)
      //1.获取表单数据
      const user = this.user
      // console.log(user)
      //2.验证表单
      //使用 Toast.loading 方法展示加载提示，通过 forbidClick 属性可以禁用背景点击。
      //使用this.$toast调用组件
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, //禁用背景点击。
        duration: 0, //持续时间 默认是2000.改为0  即一直展示
      })
      //3.提交表单请求登录接口
      //4.请求成功后处理
      //5.失败后处理
      try {
        // const res = await login(user)
        //{data} 将返回的promise里的数据解构出来
        const { data } = await login(user)
        // console.log('登录成功', res)
        //登录成功后，存储返回的token data.data返回的是token信息
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        //登录成功 跳回原来的页面
        this.$router.back()
      } catch (err) {
        //由于没有接口请求权限 故登录会失败
        // console.log('登录失败', err)
        this.$toast.fail('登录失败!')
        //为方便测试 在失败代码里 测试数据
        //测试保存token的方法是否生效
        this.$store.commit('setUser', [
          { token: 'adndief' },
          { refresh_token: 'sdehuf' },
        ])
        this.$router.back()
      }
    },
    async onsubsms() {
      //1.验证手机号是否有效
      //this.$refs验证表单，支持传入一个或多个 name 来验证单个或部分表单项，不传入 name 时，会验证所有表单项
      //返回值Promise
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // console.log(123)
      //2.验证成功 显示倒计时
      this.iscountdownShow = true
      //3.发起请求
      try {
        await sendsms(this.user.mobile)
        // console.log(res)
        this.$toast('发送验证码成功')
      } catch (err) {
        //发送失败 关闭倒计时
        this.iscountdownShow = false
        // console.log('请求失败', err)
        this.$toast('验证码请求失败')
      }
    },
  },
}
</script>
<style scoped lang="less">
.login_container {
  .form-box {
    margin: 0;
    border-radius: none;
  }
  .toutiao_a-Icon_arrow-right {
    font-size: 37px;
  }
  .send-sms {
    background-color: #ccc;
    color: #666;
  }
  .login-btn-box {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      color: #fff;
    }
  }
  .tishi {
    color: #ccc;
    font-size: 22px;
    padding: 0 50px;
  }
}
</style>
