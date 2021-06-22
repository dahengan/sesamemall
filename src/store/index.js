import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
//1安装插件
Vue.use(Vuex)

//2创建store对象
const state = {
    cartList:[]
}
const store = new Vuex.Store({
    state,
    mutations,
    actions
})


//3挂载Vue实例上
export default store
