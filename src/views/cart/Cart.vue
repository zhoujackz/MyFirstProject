<template>
    <div calss="cart">
        <!--导航栏-->
        <navbar class="navbar">
           <template v-slot:center>
               购物车({{cartLength}})
            </template>
        </navbar>
        <!--商品列表-->
        <cart-list class="cartlist"/>
        <!--汇总-->
        <cart-bottom-bar/>
    </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import CartList from './childcomps/CartList'
import CartBottomBar from './childcomps/CartBottomBar'
import {mapGetters} from 'vuex'
    export default {
        name: "Cart",
        components: {
            navbar,
            CartList,
            CartBottomBar
        },
        computed: {
            ...mapGetters(['cartLength'])
        }
    }
</script>

<style scoped>
 .cart {
  height: 100vh;
 }
  .navbar {
     background-color: var(--color-tint);
     color: #fff;
     position: fixed;
     left: 0;
     right: 0;
     top: 0;
     z-index: 999
  }
 .cartlist {
     margin-top: 44px;
     margin-bottom: 89px
 }
</style>
