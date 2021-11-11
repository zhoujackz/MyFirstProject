<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button 
          :value="isSelectAll" 
          class="check-button"
          @click.native="checkClick"/>
          <span class="little-span">全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="calculate">
         去结算 ({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
export default {
  name: "CartBottomBar",
  components: {
      CheckButton
  },
  methods: {
      checkClick(){
       if(this.isSelectAll) {
           this.$store.state.cartList.forEach(item => item.checked = false)
       }else{
           this.$store.state.cartList.forEach(item => item.checked = true)
       }
      }
  },
  computed: {
      totalPrice(){
          return '￥' + this.$store.state.cartList.filter(item => {
              return item.checked
          }).reduce((preValue,item) => {
              return preValue + item.price * item.count
          }, 0).toFixed(2)
      },
      checkLength(){
          return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
          if(this.$store.state.cartList.length === 0) return false
          return !this.$store.state.cartList.find(item => !item.checked)
      }
  }
}
</script>

<style scoped>

 .bottom-bar {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px
 }
 .check-content {
     display: flex;
     align-items: center;
     width: 90px;
 }
 .check-button { 
     margin-left: 10px;
     margin-right: 5px;
     width: 20px;
     height: 20px;
     line-height: 20px;
 }
 .price {
     margin-left: 20px;
     flex: 1
 }
 .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
 }
</style>