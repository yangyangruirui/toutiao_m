<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="small"
        >编辑</van-button
      >
    </van-cell>
    <!-- 格子间距 -->
    <van-grid :gutter="10">
      <!-- <van-grid-item
        class="grid-item"
        v-for="value in 8"
        :key="value"
        icon="clear"
        text="文字"
      /> -->
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in myChannels"
        :key="index"
        icon="clear"
      >
        <!-- 
        v-bind:class语法
        是一个对象，对象中的key表示要作用的css类名
        （此处key是active） 
                 对象中的value要计算出布尔值（此处value是index===active）
                 如果布尔值为true 则作用该类名
                 为false 不作用该类型
    -->
        <!-- :class的作用是判断当前循环的index的值是否是上一页传过来的被选中的值 如果是的话 该文本增加了一active类名 如果不是 不增加类名 -->
        <span class="text" slot="text" :class="{ active: index === active }">
          {{ item.name }}
        </span>
      </van-grid-item>
    </van-grid>

    <!--/ 格子间距 -->

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 格子间距 -->
    <van-grid class="tuijian-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="value in 8"
        :key="value"
        text="推荐"
      />
    </van-grid>
    <!--/ 频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
    }
  },
  created() {
    this.getAllChannels()
  },
  mounted() {},
  methods: {
    async getAllChannels() {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('请求频道推荐失败')
      }
    },
  },
}
</script>
<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 30px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #fc3b14;
    border: 1px solid #fc3b14;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: rgb(236, 236, 236);
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/ .van-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .tuijian-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          color: #222;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
