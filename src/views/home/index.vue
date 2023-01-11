<template>
  <div class="homepage">
    <!-- 导航栏 -->
    <van-nav-bar class="page_nav_bar" fixed>
      <van-button
        class="nav_sear_btn"
        slot="title"
        icon="search"
        type="info"
        round
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- end 导航栏 -->
    <!-- 标签 -->
    <van-tabs class="channer-tabs" v-model="active">
      <van-tab :key="item.id" v-for="item in channels" :title="item.name">
        <!-- {{ item.name }} -->
        <!-- 文章列表组件 -->
        <artical-list :channels="item"></artical-list>
        <!-- /文章列表组件 -->
      </van-tab>
      <div slot="nav-right" class="palceholder"></div>
      <div slot="nav-right" class="hanber-btn" @click="showBox">
        <van-icon name="orders-o" />
      </div>
    </van-tabs>
    <!-- /标签 -->

    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @change-channel="onchangeChannel"
      ></channel-edit>
    </van-popup>

    <!-- /弹出层 -->
  </div>
</template>

<script>
import ArticalList from './components/artical-list'
import { getChannels } from '@/api/user'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
export default {
  name: 'homeIndex',
  components: {
    ArticalList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      channels: [],
      show: false,
    }
  },
  created() {
    this.loadChannels()
  },
  mounted() {},
  computed: {
    ...mapState(['user']),
  },
  methods: {
    onchangeChannel(index, isclose = true) {
      //更新激活的频道项
      this.active = index
      //关闭编辑频道的弹出层
      this.show = isclose
    },
    async loadChannels() {
      try {
        //由于接口有问题  所以写一点假数据
        // const { data } = await getChannels()
        // console.log(data)
        // this.channels = data.data.channels
        const channels = []
        if (this.user) {
          //已登录 获取用户频道列表
          const { data } = await getChannels()
          channels = data.data.channels
        } else {
          //未登录 判断是否有本地存储的频道列表
          const localChannels = window.localStorage.getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            channels = localChannels
          } else {
            //没有本地数据 请求获取默认的频道列表
            const { data } = await getChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('请求失败')
        const fakedata = [
          { id: 0, name: '推荐' },
          { id: 1, name: 'Java' },
          { id: 2, name: 'Css' },
          { id: 3, name: 'PHP' },
          { id: 4, name: '前端' },
          { id: 5, name: '后端' },
          { id: 6, name: '测试' },
          { id: 7, name: '喜好' },
        ]
        this.channels = fakedata
      }
    },
    showBox() {
      // console.log('show')
      this.show = true
    },
  },
}
</script>
<style scoped lang="less">
.homepage {
  padding: 174px 0 88px 0;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .nav_sear_btn {
    width: 555px;
    height: 64px;
    background-color: #77bbff;
    border: none;
    font-size: 32px;
    .van-icon {
      font-size: 36px;
    }
  }
  /deep/ .channer-tabs {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    .van-tabs__nav {
      padding: 0;
    }
    .van-tab {
      border-right: 1px solid #ccc;
      min-width: 200px;
      height: 82px;
    }
    .van-tabs__line {
      bottom: 8px;
      background-color: #0060c0;
    }
    .hanber-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      background-color: #fff;
      opacity: 0.9;
      border-left: 1px solid #efefef;
      .van-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .palceholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
  }
}
</style>
