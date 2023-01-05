<template>
  <div class="minepage">
    <!-- 已登录展示的头部信息 -->
    <div v-if="user" class="nav-box user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            class="avatar"
            fit="cover"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <!-- 假设数据查询成功 头像绑定方式 -->
          <!-- <van-image round class="avatar" fit="cover" :src="userInfo.photo" /> -->

          <span class="name">
            {{ userInfo.name ? userInfo.name : 'wangxinlin' }}
          </span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">10</span>
          <span class="content">头条</span>
        </div>
        <div class="data-item">
          <span class="count">998</span>
          <span class="content">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10000</span>
          <span class="content">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">102222</span>
          <span class="content">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录展示的头部信息 -->

    <!-- 未登录展示的头部信息 -->
    <div v-else class="nav-box not-login">
      <div class="toux-container">
        <div class="toux" @click="$router.push('/login')">
          <img class="toux-img" src="~@/assets/shouji.png" />
          <span class="text">登录 / 注册</span>
        </div>
      </div>
    </div>
    <!-- /未登录展示的头部信息 -->

    <!-- 宫格 导航 -->
    <!-- 默认一行展示四个格子，可以通过 column-num 自定义列数。 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item shoucang" icon="star-o" text="收藏" />
      <van-grid-item class="grid-item loshi" icon="location-o" text="历史" />
    </van-grid>
    <!-- /宫格 导航 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      @click="logout"
      clickable
      v-if="user"
      class="logout-cell"
      title="退出登录"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'mineIndex',
  data() {
    return {
      userInfo: {},
    }
  },
  created() {
    //如果登录成功 才能获取到用户的基本信息
    if (this.user) {
      this.loaduserInfo()
    }
  },
  mounted() {},
  methods: {
    logout() {
      // console.log('logout')
      //1.弹窗提示 是否退出
      //用于确认消息，包含取消和确认按钮。
      //需要使用this.$dialog来调用
      this.$dialog
        .confirm({
          title: '确认退出码？',
        })
        .then(() => {
          // on confirm
          //2.确认退出 清除登录状态（vuex里面的user和本地存储的user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loaduserInfo() {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        // console.log('获取用户信息失败!')
        this.$toast('获取用户信息失败!')
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>
<style scoped lang="less">
.minepage {
  .nav-box {
    height: 361px;
    background: url('~@/assets/01.jpeg');
    background-size: cover;
    .toux-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 360px;
    }
    .toux {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .toux-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
        margin: 20px 0 0 0;
      }
    }
  }
  .user-info {
    .base-info {
      width: 100%;
      height: 230px;
      padding: 76px 23px 32px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 3px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-left: 20px;
        }
      }
    }
    .data-status {
      width: 100%;
      display: flex;

      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .content {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
    }
    .shoucang {
      color: rgb(252, 94, 178);
    }
    .loshi {
      color: rgb(255, 173, 73);
    }
  }
  .logout-cell {
    text-align: center;
    color: rgb(249, 88, 88);
  }
}
</style>
