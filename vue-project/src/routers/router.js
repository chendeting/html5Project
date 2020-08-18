import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [
        {
            path: '/',
            component: () => import('@/pages/portalPage/Index'),
            hidden: true,
            redirect:'/home',
            meta:{
                title:'门户网站'
            },
            children: [
                {
                    path: '/home',
                    component: () => import('@/pages/Home/Index'),
                    name: 'home',
                    meta: {
                        title: '首页',
                        listNum: 0,
                        list: '1'
                    }
                },
                {
                    path: '/platformIntroduced',
                    component: () => import('@/pages/Home/components/platformIntroduced/platformIntroduced'),
                    name: 'platformIntroduced',
                    meta: {
                        title: '数据资产评估平台详情',
                        listNum: 0,
                        list: '1'
                    }
                },
                {
                    path: '/productCenter',
                    component: () => import('@/pages/productCenter/Index'),
                    name: 'productCenter',
                    meta: {
                        title: '产品中心',
                        listNum: 1,
                        list: '2'
                    }
                },
                {
                    path: '/newsCenter',
                    component: () => import('@/pages/newsCenter/Index'),
                    name: 'newsCenter',
                    meta: {
                        title: '新闻中心',
                        listNum: 3,
                        list: '4'
                    }
                },
                {
                    path: '/partners',
                    component: () => import('@/pages/partners/Index'),
                    name: 'partners',
                    meta: {
                        title: '合作伙伴',
                        listNum: 4,
                        list: '4'
                    }
                },
                {
                    path: '/aboutUs',
                    component: () => import('@/pages/aboutUs/Index'),
                    name: 'aboutUs',
                    meta: {
                        title: '关于我们',
                        listNum: 5,
                        list: '5'
                    }
                },
                {
                    path: '/helpCenter',
                    component: () => import('@/pages/helpCenter/Index'),
                    name: 'helpCenter',
                    meta: {
                        title: '帮助中心',
                        listNum: 6,
                        list: '6'
                    }
                },
                {
                    path: '/legal',
                    component: () => import('@/pages/legal/Index'),
                    name: 'legal',
                    meta: {
                        title: '法律声明',
                        listNum: 7,
                        list: '7'
                    }
                },
            ]
        }
    ]
})
