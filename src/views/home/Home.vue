<template>
    <div id="home" @scroll="loadMore" ref="home">
        <!--导航栏组件-->
        <navbar class="homenav"><template v-slot:center><div>购物街</div></template></navbar>
        <!--轮播图组件-->
        <HomeSwiper :banners="banners"/>
        <!--分类视图组件-->
        <HomeRecommendView :recommends="recommends"/>
        <!--单一图片组件-->
        <Feature/>
        <!--有吸顶效果的控制栏组件-->
        <TabControl class="tabcontrol" :titles="['流行','新款','精选']" @tabclick="tabclick"/>
        <!--流行新款精选内容渲染组件-->
        <Goodslist :goods="showgoods"/>
        <!--点击回到顶部组件-->
        <main-back-top 
          v-show="isShow"
          :main-back-top="{ el: '#home', move: 700 }"
        />
    </div>
</template>

<script>
   import HomeSwiper from './childcomps/HomeSwiper.vue'
   import {gethomemultidata, gethomegoods} from "network/home"
   import HomeRecommendView from './childcomps/HomeRecommendView.vue'
   import Feature from './childcomps/Feature.vue'

   import navbar from 'components/common/navbar/navbar'
   import TabControl from 'components/content/tabcontrol/TabControl.vue'
   import Goodslist from 'components/content/goods/Goodslist'
   import Goodslistitem from 'components/content/goods/Goodslistitem'
   import MainBackTop from 'components/content/mainbacktop/MainBackTop.vue'
    export default {
        name: "Home",
        components: {
            HomeSwiper,
            HomeRecommendView,
            Feature,
            navbar,
            TabControl,
            Goodslist,
            Goodslistitem,
            MainBackTop
        },
        data(){
         return {
           banners:[],
           recommends:[],
           goods: {
               'pop': {page: 0,list:[]},
               'new': {page: 0,list:[]},
               'sell': {page: 0,list:[]}
           },
           currenttype: 'pop',
           isShow: false,
           homeY: 0
         }
        },
        created(){
            this.gethomemultidata()
            this.gethomegoods('pop')
            this.gethomegoods('new')
            this.gethomegoods('sell')
        },
         activated(){
         this.$refs.home.scrollTop = this.homeY;
        },
        computed: {
            showgoods(){
               return this.goods[this.currenttype].list
            }
        },
        methods: {
            tabclick(index){
              switch(index){
                  case 0:
                      this.currenttype = 'pop'
                      break
                  case 1:
                      this.currenttype = 'new'
                      break
                  case 2:
                      this.currenttype = 'sell'
                      break
              }
            },
            loadMore() {
              const homeElem = this.$refs.home;
              //记录滚动的位置，切换到当前组件时为这里获取的位置
              this.homeY = homeElem.scrollTop;
              //上拉触底加载更多
             if (
              Math.ceil(homeElem.scrollTop + homeElem.clientHeight) >=
               homeElem.scrollHeight
              ) {
                this.gethomegoods(this.currenttype);
              }
              //通过滚动监听组件的显示和隐藏
             if (homeElem.scrollTop > 1200) {
               this.isShow = true;
              } else {
               this.isShow = false;
              }
            },
            gethomemultidata(){
              gethomemultidata().then(res => {
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
            },
            gethomegoods(type){
            const page = this.goods[type].page + 1
            gethomegoods(type, page).then(res => {
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1
            })
            },
        }
    }
</script>
<style>
   #home {
     height: 100vh;
     overflow: auto;
     box-sizing: border-box;
     border-top: 44px solid transparent;
     border-bottom: 49px solid transparent;
 }
  .homenav {
     background-color: var(--color-tint);
     color: #fff;
     position: fixed;
     left: 0;
     right: 0;
     top: 0;
     z-index: 99;
 }
 .tabcontrol {
     background-color: #fff;
     position: sticky;
     top: 0;
     z-index: 9
 }
</style>