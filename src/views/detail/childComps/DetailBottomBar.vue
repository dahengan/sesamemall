<template>
  <div id="detail_bottom_bar">
    <div class="bottom_left">
      <div class="service">
        <img src="@/assets/img/detail/detail_kf.png" alt="">
        <span>客服</span>
      </div>
      <div class="shop">
        <img src="@/assets/img/detail/detail_dp.png" alt="">
        <span>店铺</span>
      </div>
      <div class="collect">
        <img src="@/assets/img/detail/detail_sc.png" alt="">
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom_right">
      <div class="cart" @click="addCart">
        加入购物车
      </div>
      <div class="buy">
        购买
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'DetailBottomBar',
    methods: {
      addCart(){
        this.$emit('addCart')
      }
    },
}
</script>

<style scoped>
#detail_bottom_bar {
  font-size: 0.9rem;
  display: flex;
  position: fixed;
  background-color: #fff;
  bottom: 0px;
  left: 0;
  right: 0;
  height: 4.09rem;
  text-align: center;
  box-shadow: 0 -0.04rem 0.4rem gray;
  z-index: 9;
}
.bottom_left {
  display: flex;
  flex: 1;
}
.bottom_left > div {
  flex: 1;
  border-right: 0.04rem solid rgba(128, 128, 128, 0.2);
}
.bottom_left img {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
}
.bottom_right {
  display: flex;
  flex: 1;
  align-items:center;
  justify-content:center
}
.bottom_right > div {
  flex: 1;
  line-height: 4.09rem;
}
.cart {
    background-color: rgb(255, 174, 0);
}
.buy {
  background-color: var(--color-tint);
  color: white;
}
</style>
