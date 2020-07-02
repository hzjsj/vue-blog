import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Cloudbase from "@cloudbase/vue-provider"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Cloudbase, {
  env: "svip9"
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
