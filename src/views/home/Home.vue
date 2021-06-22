<template>
  <div id="home"> 
    <nav-bar class="home-nav"><div slot="center">芝麻街</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1"  v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll='contentScroll' @pullingUp='loadMore'>
      <home-swiper :banner="banner" @swiperImageLoad='swiperImageLoad'/>
      <recommoned-view :recommend="recommend"/>
      <feature-view/>
      <tab-control  :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <bcak-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommonedView from './childComps/RecommonedView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from '@/components/common/navbar/NavBar.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import BcakTop from '@/components/content/backTop/BcakTop.vue'

import {getHomeMultidata,getHomeGoods} from '@/network/home'
import {itemListenerMixin} from '@/common/mixin'

export default {
    components: {
          NavBar,
          HomeSwiper,
          RecommonedView,
          FeatureView,
          TabControl,
          GoodsList,
          Scroll,
          BcakTop,
          },
    TabControle:'Home',
    data() {
      return {
        banner:[],
        recommend:[],
        goods:{
          'pop':{page: 0,list:[]},
          'new':{page: 0,list:[]},
          'sell':{page: 0,list:[]},
        },
        currenType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        itemImageListener:null
      }
    }, 
    deactivated() {
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    created() {
      // 请求多个数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mixins:[itemListenerMixin],
    computed:{
      showGoods(){
        return this.goods[this.currenType].list
      }
    },
    methods: {
      // 事件监听方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currenType = 'pop'
            break;
          case 1:
            this.currenType = 'new'
            break;
          case 2:
            this.currenType = 'sell'
            break;
        }
        this.$refs.tabControl1.tabIndex = index;
        this.$refs.tabControl2.tabIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,400);
      },
      contentScroll(position){
        //判断backtop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop 
      },
      loadMore(){
        this.getHomeGoods(this.currenType)
      },
      swiperImageLoad(){
        //获取tabControl的offSetTop
        //所有组件都有$el属性：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      
      //网络请求方法 
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
       this.banner = res.data.data.banner.list;
       this.recommend = res.data.data.recommend.list;
      })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
          getHomeGoods(type ,page).then(res =>{
            this.goods[type].list.push(...res.data.data.list);
            this.goods[type].page += 1 ;
            this.$refs.scroll.finishPullUp()
          })
      }
    },
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: #d4237a;
    color: #fff;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  
</style>