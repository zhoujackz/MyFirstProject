<template>
  <div>
      <navbar>
        <div slot="left" class="back" @click="backclick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <ul slot="center" id="title">
          <li 
             :key="index" 
             v-for="(item,index) in titles" 
             class="title-item" 
             :class="{active: currentTitle === index}" 
             @click="titleClick(index)"
             >{{item}}</li>
        </ul>
      </navbar>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
export default {
  name: "Detailnavbar",
  data(){
      return {
          titles:['商品','参数','评论','推荐'],
          currentTitle: 0,
      }
  },
  components: {
      navbar
  },
  
  methods: {
      titleClick(i){
        this.currentTitle = i;
        this.$emit('titleClick', i)
      },
      backclick(){
        this.$router.back()
      }
  }
}
</script>

<style scoped>
  li {
  list-style: none;
 }
  #title {
   display: flex;
   font-size: 13px;
 }
 .title-item {
     flex: 1
 }
 .active {
    color: var(--color-high-text)
 }
 .back img {
   margin-top: 12px
 }
</style>