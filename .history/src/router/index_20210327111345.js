import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/ebook'
    },
    {
        path: '/ebook',
        component: () =>
            import ('../views/ebook/index.vue')
    }

]

const router = new VueRouter({
    routes
})

// eslint-disable-next-line eol-last
export default router