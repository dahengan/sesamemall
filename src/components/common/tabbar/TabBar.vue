<template>
<div id="tab-bar">
    <slot></slot>
</div>
</template>

<script>
export default {
    name:'TabBar'
}
</script>

<style>
 #tab-bar{
    display: flex;
    text-align: center;
    height: 49px; /*开发高度 */
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 5px;
    box-shadow: 0px -2px 1px rgba(100, 100, 100, .1) ;
  }
</style>