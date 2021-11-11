<template>
  <back-top class="back-top" :backTop="mainBackTop">
    <img src="~assets/img/common/backtop.png" alt="" />
  </back-top>
</template>

<script>
import BackTop from "components/common/backtop/BackTop.vue";

export default {
  name: "MainBackTop",
  props: {
    mainBackTop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    BackTop,
  },
};
</script>

<style>
.back-top {
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 60px;
  right: 12px;
  z-index: 100;
}
.back-top img {
  height: 50px;
  width: 50px;
}
</style>