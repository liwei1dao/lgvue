import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout/deflayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/index',
    component: layout,
    meta: { title: '欢迎页', icon: 'mdi-home' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/index.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
