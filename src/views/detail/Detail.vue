<template>
  <div id="detail"  @scroll="detailsScroll" ref="details">
      <Detailnavbar class="detailnavbar" @titleClick="titleClick" ref="detailsTitle"/>
      <Detailswiper :topImages="topimages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <!-- 商品参数信息组件 -->
      <detail-param-info :paramInfo="paramInfo" ref="params"/>
      <!-- 商品评论信息组件 -->
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <!-- 商品推荐信息组件 -->
      <Goodslist :goods="recommends" ref="recommend"/>
      <!-- 添加购物车 -->
      <DetailBottomBar @addToCart="addToCart"/>
  </div>
</template>

<script>
import Detailnavbar from 'views/detail/childcomps/Detailnavbar.vue'
import Detailswiper from './childcomps/Detailswiper.vue'
import DetailBaseInfo from './childcomps/DetailBaseInfo.vue'
import DetailShopInfo from './childcomps/DetailShopInfo.vue'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo.vue'
import DetailParamInfo from './childcomps/DetailParamInfo.vue'
import DetailCommentInfo from './childcomps/DetailCommentInfo.vue'
import DetailBottomBar from './childcomps/DetailBottomBar.vue'
import Goodslist from 'components/content/goods/Goodslist.vue'
import MainBackTop from 'components/content/mainbacktop/MainBackTop.vue'
import {getDetail, Goods, getRecommend,Shop, GoodsParam} from 'network/detail'
import { debounce } from "commonjs/utils.js";
export default {
  name: 'Detail',
  components: {
     Detailnavbar,
     Detailswiper,
     DetailBaseInfo,
     DetailShopInfo,
     DetailGoodsInfo,
     DetailParamInfo,
     DetailCommentInfo,
     DetailBottomBar,
     Goodslist,
     MainBackTop
  },
  data(){
    return {
        iid: null,
        topimages: [],
        goods: {},
        shop: {},
        isShow: false,
        moduleLocation: [],
        setDebounce: null,
        currentIndex: -1,
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: []
    }
  },
  created(){
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result
      //获取顶部图片轮播数据
      this.topimages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //创建店铺信息
      this.shop = new Shop(data.shopInfo)
      //保存商品的详细数据
      this.detailInfo = data.detailInfo
      //获取商品的参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      
    });
    //请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list
    })
    this.setDebounce = debounce(() => {
      this.moduleLocation.push(0);
      this.moduleLocation.push(this.$refs.params.$el.offsetTop);
      this.moduleLocation.push(this.$refs.comment.$el.offsetTop);
      this.moduleLocation.push(this.$refs.recommend.$el.offsetTop);
      this.moduleLocation.push(Number.MAX_VALUE);
    });
  },
  
  methods: {
    //实现伴随滚动自动切换标题栏功能
    detailsScroll() {
      //获取dom元素
      const detailsTopY = this.$refs.details.scrollTop;
      if (detailsTopY > 1200) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }

      for (let i = 0; i < this.moduleLocation.length; i++) {
        if (
          this.currentIndex != i &&
          detailsTopY >= this.moduleLocation[i] &&
          detailsTopY < this.moduleLocation[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailsTitle.currentTitle = this.currentIndex;
          break;
        }
      }
    },
    //点击标题栏中任意标题跳转到页面当前标题所对应的内容部位
    titleClick(i){
      console.log(i);
      this.$refs.details.scrollTo({
        top: this.moduleLocation[i],
        behavior: "smooth",
      });
    },
    imgLoad() {
      this.setDebounce();
    },
    //点击添加至购物车功能
    addToCart(){
       //获取购物车需要展示的信息
       const product = {}
       product.image = this.topimages[0]
       product.title = this.goods.title
       product.desc = this.goods.desc
       product.price = this.goods.realPrice
       product.iid = this.iid
       //将商品添加到购物车里面
       this.$store.dispatch('addCart',product).then(res=>{
         this.$toast.show(res)
       })
       
    }
}
}
</script>

<style scoped>
   #detail {
     position: relative;
     z-index: 9;
     background-color: #fff;
     height: 100vh;
     overflow: auto;
   }
   .detailnavbar {
     position: fixed;
     z-index: 9;
     background-color: #fff;
     left: 0;
     right: 0;
     top: 0;
   }
</style>