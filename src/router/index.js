import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    redirect: '/home',
    children: [
        // {
        //     path: '/home',
        //     name: 'home',
        //     component: () => import('../views/home')
        // },
        // {
        //     path: '/user',
        //     name: "user",
        //     component: () => import('../views/user')
        // },
        // {
        //     path: '/mall',
        //     name: "mall",
        //     component: () => import('../views/mall')
        // },
        // {
        //     path: '/page1',
        //     name: "page1",
        //     component: () => import('../views/other/pageOne.vue')
        // },
        // {
        //     path: '/page2',
        //     name: "page2",
        //     component: () => import('../views/other/pageTwo.vue')
        // }
    ]
}, {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue')
}]

const router = new Router({
    mode: 'history',
    routes
})

export default router;