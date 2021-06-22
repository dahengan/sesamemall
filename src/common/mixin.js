import {debounce} from '@/common/utils'
export const itemListenerMixin = {
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,75)
        this.itemImageListener = ()=>{
        refresh()
      }
        this.$bus.$on('itemImageLoad',this.itemImageListener)
    },
}

import BcakTop from '@/components/content/backTop/BcakTop.vue'
export const BackTopMixin = {
  components:{
    BcakTop 
  },
  data() {
    return {
      isShowBackTop:true,
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0,400);
    },
    listenShowBackTop(posittion){
      this.isShowBackTop = (-posittion.y) > 1000
    }
  },

}