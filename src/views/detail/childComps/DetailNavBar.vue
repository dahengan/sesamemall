<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="backClick">
              <img src="@/assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
              <div  class="title_item" 
                    v-for="(item ,index) in titles" 
                    :key="item.label" :class="{active: index === currentIndex}" @click="titleClick(index)">
                    {{item}}
               </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'
export default {
  components: { NavBar },
    name:'DetailNavBar',
    data() {
        return {
            titles:["商品", "参数", "评论", "推荐"],
            currentIndex:0
        }
    },
    methods: {
        titleClick(index){
            this.currentIndex = index;
            this.$emit('titleClick',index)
        },
        backClick(){
            this.$router.back()
        }
    },
}
</script>

<style scoped>
#detail_nav_bar {
  /* position: relative; */
  /* z-index: 9; */
  background-color: #fff;
}
.back img {
  margin-top: 0.66rem;
}
.title {
  font-size: 1.1rem;
  display: flex;
}
.title_item {
  flex: 1;
}
.active {
  color: #d4237a;
}
</style>

