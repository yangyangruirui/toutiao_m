<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="small"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
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
        @click="myChannelClick(item, index)"
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
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixedChannel.includes(item.id)"
        ></van-icon>
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
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in tuijianChannels"
        :key="index"
        :text="channel.name"
        @click="addChannel(channel)"
      />
    </van-grid>
    <!--/ 频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from '@/api/channel'
import { mapState } from 'vuex'
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
      isEdit: false, //控制编辑状态的显示
      fixedChannel: [0], //固定的不可编辑的频道
    }
  },
  created() {
    this.getAllChannels()
  },
  mounted() {},
  computed: {
    //引入user 判断是否登录
    ...mapState(['user']),
    //计算属性会观测内部依赖数据的变化
    //如果依赖的数据发生变化 则计算属性会重新执行
    //故 在点击推荐列表的数据添加到“我的频道”时 使用的方法是myChannel.push() myChannels数组发生了变化 “推荐频道”的数据会重新刷新 所以就不用再手动删除推荐频道里面的数据了

    //方法1：
    // tuijianChannels() {
    //   const channels = []
    //   this.allChannels.forEach((channel) => {
    //     //find遍历数组 找到满足条件的元素项 并将匹配的元素返回
    //     const ret = this.myChannels.find((myChannel) => {
    //       return myChannel.id === channel.id
    //     })
    //     //如果我的频道中不包括该频道项，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })

    //   //把计算结果返回
    //   return channels
    // },

    //方法2：
    tuijianChannels() {
      //数组的filter方法：遍历数组 将符合条件的元素存储到新的数组中
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((mychannel) => {
          //返回的是相同的ID项  此处需要不同的项 故取反
          return mychannel.id === channel.id
        })
      })
    },
  },
  methods: {
    myChannelClick(channel, index) {
      //console.log(channel, index)
      if (this.isEdit) {
        //如果是固定频道 则不删除
        if (this.fixedChannel.includes(channel.id)) {
          return
        }
        //如果是编辑状态 执行删除操作
        //参数1：要删除的元素的开始索引
        //参数2：删除的个数 如果不指定，则从参数1开始一直删除到最后
        if (index <= this.active) {
          this.$emit('change-channel', this.active - 1, true)
        }
        //删除频道代码
        this.myChannels.splice(index, 1)
        //处理数据持久化
        this.deleteChannel(channel)
      } else {
        //非编辑状态  执行切换频道的操作
        this.$emit('change-channel', index, false)
      }
    },
    //删除频道方法
    async deleteChannel(channel) {
      try {
        if (this.user) {
          //一登录  则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          //未登录  将数据更新到线下
          window.localStorage.setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('操作失败')
      }
    },
    //添加频道
    async addChannel(channel) {
      this.myChannels.push(channel)
      //数据持久化处理
      if (this.user) {
        try {
          //已登录：把数据请求接口放到线上
          await addUserChannel({
            id: channel.id, //频道ID
            seq: this.myChannels.length, //序号
          })
        } catch (error) {
          this.$toast('保存失败')
        }
      } else {
        //未登录：把数据存储到本地
        window.localStorage.setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
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
      .van-grid-item__icon-wrapper {
        position: unset;
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
