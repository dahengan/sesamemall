<template>
  <div class="tab-control">
      <div class="tab-control-item" v-for="(item , index) in titles" 
      :key="item.label" @click="tabClick(index)">
          <span :class="{active: index === tabIndex}">{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    data() {
        return {
            tabIndex:0
        }
    },
    methods: {
        tabClick(index){
            this.tabIndex = index;
            this.$emit('tabClick', index);// 子传父
        }
    },
    props:{
        titles:{
            type:Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style>
 .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #fff;
  }

  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item span {
    padding: 5px;
    font-size: 20px;
  }
  .active {
    border-bottom: 2px solid #d4237a;
    color: #d4237a;
  }
</style>