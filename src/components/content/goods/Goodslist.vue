<template>
  <div class="goods">
   <Goodslistitem :key=item.id v-for="item in goods" :goodsitem="item"/>
  </div>
</template>

<script>
import Goodslistitem from './Goodslistitem.vue'
export default {
   name: 'Goodslist',
   components: {
      Goodslistitem
   },
   props: {
       goods: {
           type: Array,
           default(){
               return []
           }
      }
   }
}
</script>

<style>
.goods {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   padding: 2px;
}

</style>