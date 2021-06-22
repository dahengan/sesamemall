<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <shopcartlist/>
    <car-buttom-bar/>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import CarButtomBar from './childComps/CarButtomBar.vue'
import Shopcartlist from './childComps/Shopcartlist.vue'
export default {
  components: { 
    NavBar,
    Shopcartlist,
    CarButtomBar 
    },
    name:'Shopcart',
    computed:{
      cartLength(){
        return this.$store.state.cartList.length
      }
    }
}
</script>

<style scoped>
  .nav-bar{
    background-color: #d4237a;
    color: #fff;
    font-size: 20px;
  }
</style>

