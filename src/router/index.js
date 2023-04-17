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
    path: '/register',
    component: Layout,
    // component: () => import('@/views/register/register'),
    children: [
      {
        path: 'register',
        name: '注册',
        component: () => import('@/views/register/register'),
        meta: { title: '注册', icon: 'user' },
        hidden: true
      }
    ]
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
      meta: { title: '医疗文献检索系统', icon: '' },
      hidden: true
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
        meta: { title: '上传文献', icon: 'upload' }
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
        meta: { title: '文献归档', icon: 'file' }
      }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    children: [
      {
        path: 'chart',
        name: '分析',
        component: () => import('@/views/chart/chart'),
        meta: { title: '文献分析', icon: 'chart' }
      }
    ]
  },
  /* {
    path: '/filedetail/filedetail',
    component: () => import('@/views/filedetail/filedetail'),
    name: '文件夹详情',
    meta: { title: '文件夹详情' },
    hidden: true
  }, */
  {
    path: '/details',
    component: Layout,
    children: [
      {
        path: 'details',
        name: '文献详情',
        component: () => import('@/views/details/details'),
        meta: { title: '文献详情', icon: 'file' },
        hidden: true
      }
    ]
  },
  {
    path: '/filedetail',
    component: Layout,
    children: [
      {
        path: 'filedetail',
        name: '文件夹详情',
        component: () => import('@/views/filedetail/filedetail'),
        meta: { title: '文件夹详情', icon: 'file' },
        hidden: true
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    children: [
      {
        path: 'pdf',
        name: 'pdf详情',
        component: () => import('@/views/pdf/pdf'),
        meta: { title: 'pdf详情', icon: 'file' },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'user',
        name: '用户详情',
        component: () => import('@/views/user/user'),
        meta: { title: '用户详情', icon: 'user' },
        hidden: true
      }
    ]
  },
  {
    path: '/buy',
    component: Layout,
    children: [
      {
        path: 'buy',
        name: '购买积分',
        component: () => import('@/views/buy/buy'),
        meta: { title: '购买积分', icon: 'user' },
        hidden: true
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
