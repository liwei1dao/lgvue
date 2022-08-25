import Vue from 'vue'
import store from '@/store'
import message from '@/components/message/'
import VueRouter from 'vue-router'
import layout from '@/layout/deflayout.vue'

Vue.use(VueRouter)



const staticRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/index',
    component: layout,
    meta: { title: '欢迎页', icon: 'mdi-home' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/register.vue'),
      }
    ]
  }
]
/*动态路由*/
const Dynamicroutes = [

]

/*添加动态路由*/
export function addRoutes (role) {
  var routes = []
  for (const route of Dynamicroutes) {
    if (route.meta.role == 0 || route.meta.role & role > 0) {
      var temproute = { path: route.path, component: route.component, meta: route.meta }
      temproute.children = null
      if (route.children && route.children.length > 0) {
        temproute.children = []
        for (const child of route.children) {
          var tempchild = { path: child.path, component: child.component, meta: child.meta }
          var isopn = child.meta.role & role
          if (child.meta.role == 0 || isopn > 0) {
            temproute.children.push(tempchild)
          }
        }
      }
      routes.push(temproute)
    }
  }
  return routes
}


const BasePages = ['login', 'register', 'index']
const router = createRouter()
// /*定义全局前置守卫（里面有两个坑要注意）*/
router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  const userinfo = store.getters.user
  // if (to.name == LOGIN_PAGE_NAME) {
  if (BasePages.includes(to.name)) {
    if (token && !userinfo) {//token 存在但是用户信息不存在 异步读取用户信息
      store.dispatch('user/getuserinfo')
    }
    next()
  } else {
    if (token && userinfo) {
      next()
    } else {
      if (token) {
        try {
          await store.dispatch('user/getuserinfo')
          await store.dispatch('app/setrouters', store.getters.user.UserRole | 0)
          router.addRoutes(store.getters.routers)
          next({ ...to, replace: true });
        } catch (error) {
          message.error(error.message)
          await store.dispatch('user/resetToken')
          // 如果没有登录而且前往的页面不是登录页面，跳转到登录页
          next({ name: BasePages[0] })
        }
      } else {
        next({ name: BasePages[0] })
      }
    }
  }
})

function createRouter () {
  return new VueRouter({
    routes: staticRoutes,
  })
}

/*重置路由*/
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
