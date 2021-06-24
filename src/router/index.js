import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
Vue.use(Router)
const router = new Router({
    routes: [
      {
        path: '/',
        component: index,
        redirect: '/index'
      },
      {
        path: '/index',
        component: index,
        children: []
      },
    ]
  })
  export default router