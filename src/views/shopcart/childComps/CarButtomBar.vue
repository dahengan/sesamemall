<template>
  <div id="CarButtomBar">
      <div class="checkB">
          <check-button @click.native="selectall" :isChecked='isSelectAll'/>
          <span>全选</span>
      </div>
      <div class="total">
          <span>合计</span>
          <span>￥({{totalPrice}})</span>
      </div>
      <div class="settlement" @click="pay">去结算({{checkedLength}})</div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  components: { CheckButton },
    name:'CarButtomBar',
    computed:{
        totalPrice(){
            return this.$store.state.cartList.filter( item =>{
                return item.checked
                //reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
                //array.reduce(function(total, currentValue,), initialValue)
                //total	必需。初始值, 或者计算结束后的返回值。currentValue	必需。当前元素 initialValue	可选。传递给函数的初始值
            }).reduce((prevalue,item)=>{
                return  prevalue + item.price * item.count
            },0).toFixed(2)
        },
        checkedLength(){
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
            if(this.$store.state.cartList.length === 0){    
                return false
            } else {
                return !this.$store.state.cartList.find(item => !item.checked)
            }
        }
    },
    methods: {
        selectall(){
            if(this.isSelectAll){
                this.$store.state.cartList.forEach(item => item.checked = false)
            }else{
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        pay(){
            if(!this.isSelectAll){
                this.$toast.show('请选择购买商品',1000)
            }
        }
    },
}
</script>

<style scoped>
#CarButtomBar{
    height: 40px;
    background-color: rgb(228, 228, 228);
    display: flex;
}
.checkB{
    display: flex;
    justify-content: center;
    flex-grow: 1;
}
.checkB span {
    line-height: 40px;
    text-align: center;
    padding-left: 5px;
}
.total{
    width: 150px;
    line-height: 40px;
    text-align: center;
}
.settlement{
    flex-grow: 1;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #d4237a;
}
</style>