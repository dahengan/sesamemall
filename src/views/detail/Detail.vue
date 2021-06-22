<template>
    <div class="detail">
        <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"/>
        <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
            <detail-swiper :top-images='topImages'/>
            <detail-goods-info :goods='goods'/>
            <detail-shop-info :shop="shop"/>
            <detail-goods :detailInfo='detailInfo' @loadImg='loadImg'/>
            <detail-params ref="params" :goodsParams='goodsParams'/>
            <detail-comment-info ref="comment" :CommentInfo='CommentInfo'/>
            <goods-list :goods='Recommends' ref="Recommends"/>
        </scroll> 
        <detail-bottom-bar @addCart='addCart'/>
        <bcak-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
import DetailNavBar from '@/views/detail/childComps/DetailNavBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoods from './childComps/DetailGoods.vue';
import DetailParams from './childComps/DetailParams.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import BcakTop from '../../components/content/backTop/BcakTop.vue';

import {getDetail,Goods,Shop,GoodsParams,getRecommend} from '@/network/detail'
import {itemListenerMixin} from '@/common/mixin'
import {debounce} from '@/common/utils'

import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import DetailBottomBar from './childComps/DetailBottomBar.vue';







export default {
  components: { DetailNavBar,DetailSwiper, DetailGoodsInfo, DetailShopInfo, DetailGoods, Scroll, DetailParams, DetailCommentInfo, GoodsList, DetailBottomBar, BcakTop },
    name:'Detail',
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            goodsParams:{},
            CommentInfo:{},
            Recommends:[],
            itemImageListene:null,
            themeTopYs:[],
            getthemeTopYs:null,
            currentIndex:0,
            isShowBackTop:false,
        }
    },
    created() {
        //保存存传入的id
        this.iid = this.$route.params.iid;
        //根据iid请求商品详细数据
        getDetail(this.iid).then(res=>{
           // 获取顶部轮播图片数据
           this.topImages = res.data.result.itemInfo.topImages;
           // 获取商品信息
           this.goods = new Goods(res.data.result.itemInfo,res.data.result.columns,res.data.result.shopInfo.services)
           // 获取店铺信息
           this.shop = new Shop(res.data.result.shopInfo)
           // 获取商品详细信息
           this.detailInfo = res.data.result.detailInfo;
           // 获取商品参数
           this.goodsParams = new GoodsParams(res.data.result.itemParams.info,res.data.result.itemParams.rule)
           //获取评论信息
           if (res.data.result.rate.cRate != 0) {
               this.CommentInfo = res.data.result.rate.list[0]
           }
       });
       getRecommend().then(res=>{
           // 获取推荐商品信息
           this.Recommends = res.data.data.list
       })
       //给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
       this.getthemeTopYs = debounce(()=>{
           this.themeTopYs = [];
           this.themeTopYs.push(0);
           this.themeTopYs.push(this.$refs.params.$el.offsetTop);
           this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
           this.themeTopYs.push(this.$refs.Recommends.$el.offsetTop);
       },97 )
    },
    methods: {
        loadImg(){
            this.$refs.scroll.refresh();
            this.getthemeTopYs();
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        contentScroll(posittion){
            // console.log(posittion)
            // 获取y值
            const positionY = -posittion.y;
            let length = this.themeTopYs.length
            for (let i=0;i<length;i++) {
                // this.currentIndex != i 防止赋值过于频繁
                if(this.currentIndex != i &&
                    ((i<length-1 && positionY >this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||(i===length-1 && positionY >= this.themeTopYs[i]))
                ){
                    this.currentIndex = i;
                    console.log(this.currentIndex)
                    this.$refs.nav.currentIndex = this.currentIndex                    
                }
            }
            this.isShowBackTop = (-posittion.y) > 1000
        },
        backClick(){
        this.$refs.scroll.scrollTo(0,0,400);
        },
        addCart(){
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.price;
            product.iid = this.iid;
            // 将商品添加到购车里
            this.$store.dispatch('addCart',product).then(res =>{
                this.$toast.show(res,1000)
            })

        }
    },
    mixins:[itemListenerMixin],
    destroyed() {
        //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
}
</script>

<style  scoped>
    .detail{
        position: relative;
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        position: absolute;
        top: 2.9rem;
        bottom: 4.09rem;
        left: 0;
        right: 0;
        overflow: hidden;
    }
</style>