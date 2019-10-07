import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/cssFilter',
      name: 'cssFilter',
      component: () => import('./views/CssFilters/index.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('./views/Video/index.vue')
    },
    {
      path: '/imageEditor',
      name: 'imageEditor',
      component: () => import('./views/ImageEditor/index.vue')
    }
  ]
})
