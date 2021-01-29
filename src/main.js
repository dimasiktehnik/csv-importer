import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuePapaParse from "vue-papa-parse"
import store from "./store";

Vue.config.productionTip = false
Vue.use(VuePapaParse)
Vue.use(Vuex)

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
