<template>
  <div class="articalpage">
    <van-pull-refresh
      v-model="isloading"
      @refresh="onRefresh"
      :success-text="successText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item.id" :title="item.title" /> -->
        <artical-list
          v-for="(artical, index) in list"
          :key="index"
          :artical="artical"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtical } from '@/api/artical'
import ArticalItem from '@/components/artical-item'
export default {
  name: 'ArticalList',
  components: { ArticalItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false, //控制列表加载失败的提示状态
      isloading: false, //控制下拉刷新的loading状态
      successText: '',
    }
  },
  props: {
    channels: {
      type: Object,
      required: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // },
    async onLoad() {
      //1.请求获取数据
      try {
        //2.将请求回来的数据填充到list数组中
        const { data } = await getArtical({
          channel_id: this.channels.id,
          //timestamp是请求数据的页码，
          //请求第一页数据 传当前最新事件戳
          //用于请求之后数据的时间戳会在当前页面的结果返回
          timestamp: this.timestamp || Date.now(),
          //with_top是否包含置顶  0-不包含 1-包含
          with_top: 1,
        })
        const { results } = data.data
        // 此时results 是一个数组  要将results解构后推入list数组中才行
        this.list.push(...results)
        //3.本次数据加载结束后 要将加载中的状态改为false
        this.loading = false
        //4.数据加载完成后  将finished状态改为true
        if (results.length) {
          //更新下一次要请求的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        // this.$toast('数据请求失败')
        //展示错误提示状态
        this.error = true
        this.loading = false
      }
    },
    //当下拉刷新的时候会触发这个函数
    async onRefresh() {
      //console.log('refresh')
      //请求获取数据
      try {
        const { data } = await getArtical({
          channel_id: this.channels.id,
          timestamp: Date.now(),
          with_top: 1,
        })
        //将数据追加到列表顶部
        this.list.unshift(...data.data.results)
        this.successText = '刷新成功'
        //关闭下拉刷新的状态
        this.isloading = false
      } catch (error) {
        // console.log('请求失败')
        this.successText = '刷新失败'
        this.isloading = false
      }
      //将数据追加到列表的顶部
    },
  },
}
</script>
<style scoped lang="less">
.articalpage {
  height: 79vh;
  overflow-y: auto;
}
</style>
