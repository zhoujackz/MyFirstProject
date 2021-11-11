<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
   name: "Toast",
   /*props: {
       message: {
          type: String,
          default: ''
       },
       show: {
           type: Boolean,
           default: false
       }
   },*/
   data(){
     return {
       message: '',
       isShow: false
     }
   },
   methods: {
     show(message="成功添加至购物车",duration=2000){
       this.isShow = true;
       this.message = message
       setTimeout(() => {
          this.isShow = false;
          this.message = ''
       },duration)
     }
   }
}
</script>

<style>
 .toast {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  padding: 3px 10px;
}
 
</style>