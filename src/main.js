import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
Vue.use(ElementUI)
Vue.config.productionTip = false

console.log('load success')
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
