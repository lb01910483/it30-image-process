import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
// const wasm = import('../wasm/pkg')
Vue.use(ElementUI)
Vue.config.productionTip = false

// wasm
//   .then(m => {
//     console.log('load wasm success')
//     Vue.prototype.$wasm = m
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// })
// .catch(e => {
//   console.log('wasm load error', e)
// })
