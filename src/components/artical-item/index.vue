<template>
  <van-cell class="artical-itm">
    <div slot="title" class="title">{{ artical.title }}</div>
    <div slot="label">
      <div v-if="artical.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          :key="index"
          v-for="(img, index) in artical.cover.images"
        >
          <van-image width="100" height="100" :src="img" />
        </div>
      </div>
      <div>
        <span>{{ artical.ath_name }}</span>
        <span>{{ artical.comm_count }}</span>
        <span>{{ artical.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="artical.cover.type === 1"
      slot="default"
      width="100"
      height="100"
      :src="artical.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticalItem',
  props: {
    artical: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style scoped lang="less"></style>
