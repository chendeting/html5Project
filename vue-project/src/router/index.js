import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index',
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require.ensure([], () => resolve(require('@/page/index')), 'index')
    },
    {
      path: '/FAQ',
      name: 'FAQ',
      component: resolve => require.ensure([], () => resolve(require('@/page/FAQ')), 'FAQ')
    },
    {
      path: '/aboutUs',
      name: 'about',
      component: resolve => require.ensure([], () => resolve(require('@/page/aboutUs')), 'aboutUs')
    },
    {
      path: '/contactWe',
      name: 'contact',
      component: resolve => require.ensure([], () => resolve(require('@/page/contactUs')), 'contactUs')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
