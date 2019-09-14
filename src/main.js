import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueGoogleCharts)
Vue.use(ElementUI)
Vue.config.productionTip = false

console.log('load success')
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// options: {
//   title: 'Approximating Normal Distribution',
//   legend: { position: 'none' },
//   colors: ['#4285F4'],
//   tooltip: {
//     trigger: 'none'
//   },
//   chartArea: { width: 200 },
//   hAxis: {
//     ticks: [0, 255]
//   },
//   bar: { gap: 0 },

//   histogram: {
//     bucketSize: 0.02,
//     minValue: 0,
//     maxValue: 255
//   }
// }

// <GChart
// v-if="test.length"
// type="Histogram"
// :data="test"
// :options="options"
// />
