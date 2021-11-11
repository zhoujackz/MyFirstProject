<template>
      <swiper class="swiperitem">
          <swiper-item :key="index" v-for="(item,index) in topImages">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: "Detailswiper",
  components: {
      Swiper,
      SwiperItem
  },
  props: {
    topImages: {
        type: Array,
        default(){
            return []
        }
    }
  }
}
</script>

<style scoped>
 .swiperitem {
     height: 300px;
     overflow: hidden;
 }
</style>