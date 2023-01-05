<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <router-view />
    <!-- end 路由出口 -->

    <!-- 标签栏 -->
    <van-tabbar routes v-model="acive">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="search">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video">视频</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="setting-o">
        <i slot="icon" class="toutiao toutiao_Icon_profile"></i>
        <!-- 方法1：获取store里面的user信息 -->
        <!-- {{ $store.state.user ? '我的' : '未登录' }} -->
        <!-- 方法2: import mapState来获取user的信息 -->
        {{ user ? '我的' : '未登录' }}
      </van-tabbar-item>
    </van-tabbar>
    <!-- end 标签栏 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'layoutIndex',
  data() {
    return {
      acive: 0,
    }
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {
    ...mapState(['user']),
  },
}
</script>
<style scoped lang="less">
.layout-container {
  .toutiao_Icon_profile {
    font-size: 40px;
  }
}
</style>
