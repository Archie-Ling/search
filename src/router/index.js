import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/search',
    children: [{
      path: 'search',
      name: '首页',
      component: () => import('@/views/search/search'),
      meta: { title: '医疗文献检索系统', icon: '' }
    }]
  },

  {
    path: '/search',
    component: Layout,
    children: [
      {
        path: 'search',
        name: '搜索文献',
        component: () => import('@/views/search/search'),
        meta: { title: '搜索文献', icon: 'search' }
      }
    ]
  },

  {
    path: '/upload',
    component: Layout,
    children: [
      {
        path: 'upload',
        name: '上传文档',
        component: () => import('@/views/upload/upload'),
        meta: { title: '上传文档', icon: 'upload' }
      }
    ]
  },

  {
    path: '/file',
    component: Layout,
    children: [
      {
        path: 'file',
        name: '归档',
        component: () => import('@/views/file/file'),
        meta: { title: '归档', icon: 'file' }
      }
    ]
  },

  {
    path: '/details',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'details',
        name: '详情',
        component: () => import('@/views/details/details'),
        meta: { title: '详情', icon: '' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
