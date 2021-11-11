<template>
   <div class="cartlist">
       <cart-list-item 
       v-for="item in cartList" 
       :key="item.id" 
       :itemInfo="item"/>
   </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartListItem from './CartListItem.vue'
export default {
   name: "CartList",
   components: {
     CartListItem
   },
   computed: {
      ...mapGetters(['cartList'])
   }
   
}
</script>

<style scoped>
 
</style>