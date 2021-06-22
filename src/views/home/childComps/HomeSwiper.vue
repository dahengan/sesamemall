<template>
  <swiper>
      <swiper-item v-for="item in banner" :key="item.label">
        <a :href="item.link">
          <img :src="item.image" alt=""  @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
    name:'HomeSwiper',
    data() {
      return {
        isLoad:false
      }
    },
    props:{
        banner:{
            type:Array,
            default () {
                return []
            }
        }
    },
    methods: {
      imageLoad(){
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    },
    components:{Swiper,SwiperItem}
}
</script>

<style>

</style>