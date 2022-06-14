import {createRouter,createWebHashHistory} from 'vue-router'
import store from "@/store";

// Vue2 具体看文档   https://router.vuejs.org/zh/guide/#javascript
const router =  createRouter({
    history: createWebHashHistory(),
    routes: [
        // 主页
        {
            path: '/home',
            component: () => import('@/pages/Home/index.vue'),
            meta:{
                index:0,
            }
        },
        // 广场
        {
            path: '/square',
            component: () => import('@/pages/Square/index.vue'),
            meta:{
                index:1,
            }
        },
        // 导航
        {
            path: '/nav',
            component: () => import('@/pages/Nav/index.vue'),
            meta:{
                index:2,
            }
        },
        // 教程
        {
            path: '/course',
            component: () => import('@/pages/Course/index.vue')
        },
        // 问答
        {
            path: '/quiz',
            component: () => import('@/pages/Quiz/index.vue')
        },
        // 体系
        {
            path: '/system',
            component: () => import('@/pages/System/index.vue')
        },
        // 项目
        {
            path: '/project',
            component: () => import('@/pages/Project/index.vue')
        },
        // 公总号
        {
            path: '/wxAccout',
            component: () => import('@/pages/WxAccout/index.vue')
        },
        // 项目分类
        {
            path: '/category',
            component: () => import('@/pages/Category/index.vue')
        },
        // 工具
        {
            path: '/tools',
            component: () => import('@/pages/Tools/index.vue')
        },
        // 消息
        {
            path: '/message',
            component: () => import('@/pages/Message/index.vue')
        },
        // 关于我
        {
            path: '/About',
            component: () => import('@/pages/About/index.vue')
        },


        // 重定向，站点一打开跳转的位置
        {
            path:'/:pathMatch(.*)*',
            redirect: '/home'
        }
    ]
})
// 设置全局守卫
router.beforeEach((to,from,next) => {
    next()
})

export default router




