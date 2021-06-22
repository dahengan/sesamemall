<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    //创建
   this.scroll = new BScroll(this.$refs.wrapper, {
      mouseWheel: true,
      click: true,
      tap: true,
      disableMouse: false,
      disableTouch: false,
      probeType:this.probeType,
      pullUpLoad:true,
   })
   //监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll', position)
    })
   //监听上拉事件
   this.scroll.on('pullingUp',()=>{
     this.$emit('pullingUp')
   })

  },
  methods: {
    scrollTo(x, y, time=300){
      this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },
  

}
</script>

<style scoped>

</style>