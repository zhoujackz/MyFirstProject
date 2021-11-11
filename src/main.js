import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(toast)
Vue.use(VueLazyLoad,{
  error: require('./assets/img/common/placeholder.png'),
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
