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
            // eslint-disable-next-line func-call-spacing
            import ('../views/ebook/index.vue'),
        childen: [{
            path: '/:fileName',
            component: () =>
                // eslint-disable-next-line func-call-spacing
                import ('../components/ebook/EbookReader.vue')
        }]
    }

]

const router = new VueRouter({
    routes
})

// eslint-disable-next-line eol-last
export default router