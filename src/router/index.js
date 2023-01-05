import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由表
const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login')
    },
    {
        path: '/',
        component: () =>
            import ('@/views/layout'),
        children: [{
                path: '', //空表示默认路径
                name: 'home',
                component: () =>
                    import ('@/views/home')
            },
            {
                path: '/qa',
                name: 'qa',
                component: () =>
                    import ('@/views/qa')
            },
            {
                path: '/video',
                name: 'video',
                component: () =>
                    import ('@/views/video')
            },
            {
                path: '/mine',
                name: 'mine',
                component: () =>
                    import ('@/views/mine')
            }
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router