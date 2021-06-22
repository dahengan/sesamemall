<template>
  <div class="check-button" :class="{check: isChecked}">
      <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name:'checkButton',
    props:{
       isChecked:{
            type:Boolean,
            default(){
                return false
            }
        }
    }
}
</script>

<style scoped>
    .check-button{
        width: 20px;
        height: 20px;
        margin:auto 0;
        border-radius: 50%;
        border: 1px solid rgb(151, 149, 149);
    }
    .check{
        width: 20px;
        height: 20px;
        margin:auto 0;
        border-radius: 50%;
        border: 1px solid rgb(151, 149, 149);
        background-color: #d4237a;
    }
</style>
