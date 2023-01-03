<template>
  <div id="app">
    <h1>头条</h1>
    <!-- 路由出口 -->
    <div>
      <i class="toutiao toutiao_Icon_profile"></i>
    </div>
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
    </div>
    <div class="hello">hello</div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
}
</script>

<style lang="less">
.hello {
  width: 550px;
  height: 64px;
  background-color: pink;
}
</style>
