<template>
  <div class="recommend">
      <div v-for="item in recommend" :key="item.label" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:'RecommonedView',
    props:{
        recommend:{
            type:Array,
            default () {
            return []
        }
        }
    }
}
</script>

<style>
    .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 5px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item{
    flex: 1;
  }

  .recommend-item img{
    width: 70px;
    height: 65px;
    border-radius: 100%;

  }
</style>