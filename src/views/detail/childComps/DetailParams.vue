<template>
   <div id="detail_params">
    <table class="params_rule">
      <tbody v-if="goodsParams.tables">
        <tr v-for="(item, index) in goodsParams.tables[0]" :key="index" >
          <th>{{ item[0] }}</th>
          <td v-for="(td_item, td_index) in item.length - 1" :key="td_index">
            {{ item[td_item] }}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="params_set">
      <tbody>
        <tr v-for="(item, index) in goodsParams.set" :key="index">
          <th>{{ item.key }}</th>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="info_img" v-if="goodsParams.image != ''">
      <img :src="goodsParams.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
    name:'DetailParams',
    props:{
        goodsParams:{
            type:Object
        }
    }
}
</script>

<style scoped>
#detail_params {
  font-size: 0.65rem;
  padding: 0.42rem 0.34rem;
  border-bottom: 0.3rem solid rgba(128, 128, 128, 0.2);
}

.params_rule,
.params_set {
  border-bottom: 0.1rem solid rgba(128, 128, 128, 0.5);
  border-collapse: collapse; /* 可以合并邻近的边框，且可以让tr显示出边框 */
  margin: 0 auto;
  margin-bottom: 0.42rem;
  width: 24.568rem;
}
.params_rule tr,
.params_set tr {
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.5);
}

.params_rule th {
  text-align: left;
  padding-right: 1rem;
  white-space: nowrap;
}
.params_rule td {
  padding: 0.5rem;
}

.params_set th {
  text-align: left;
  padding: 0.5rem 3.5rem 0.5rem 0rem;
  white-space: nowrap;
}
.params_set td {
  color: var(--color-high-text);
}

.info_img img {
  width: 100%;
}
</style>