<template>
  <div class="tabbar-item" @click="itemclick">
   <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
   <div :style="activestyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabbaritem",
  props: {
    path: String,
    activecolor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemclick(){
      this.$router.replace(this.path)
    }
  },
  computed: {
    isActive() {
     return this.$route.path.indexOf(this.path) !== -1
    },
     activestyle(){
       return this.isActive? {color: this.activecolor} : {}
     }
  }
}
</script>

<style>

  .tabbar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tabbar-item img {
    margin-top: 3px;
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
</style>