<template>
  <div id="cart_list">
      <scroll class="cart_scroll" ref="scroll">
          <cart-list-item v-for="(item,index) in $store.state.cartList" :key="index" :item='item'/>
      </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'
export default {
  components: { Scroll,
   CartListItem 
   },
  name:'Shopcart',
  activated() {
      this.$refs.scroll.refresh();
  },
}
</script>

<style scoped>
#cart_list {
  font-size: 0.68rem;
  height: calc(100vh - 44px - 49px - 40px);
}
.cart_scroll {
  height: 100%;
  overflow: hidden;
}
</style>
