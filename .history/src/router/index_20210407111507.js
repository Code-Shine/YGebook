import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/bookstore'
    },
    {
        path: '/ebook',
        component: () =>
            // eslint-disable-next-line func-call-spacing
            import ('../views/ebook/index.vue'),
        children: [{
            path: ':fileName',
            component: () =>
                // eslint-disable-next-line func-call-spacing
                import ('../components/ebook/EbookReader.vue')
        }]
    },
    {
        path: '/bookstore',
        component: () =>
            // eslint-disable-next-line func-call-spacing
            import ('../views/bookstore/index.vue'),
        redirect: '/bookstore/home',
        children: [{
                path: 'home',
                component: () =>
                    // eslint-disable-next-line func-call-spacing
                    import ('../views/bookstore/StoreHome.vue')
            },
            {
                path: 'shelf',
                component: () =>
                    import ('./views/bookstore/StoreShelf.vue')
            },
            {
                path: 'list',
                component: () =>
                    // eslint-disable-next-line func-call-spacing
                    import ('../views/bookstore/StoreList.vue')
            },
            {
                path: 'detail',
                component: () =>
                    // eslint-disable-next-line func-call-spacing
                    import ('../views/bookstore/StoreDetail.vue')
            },
            {
                path: 'speaking',
                component: () =>
                    // eslint-disable-next-line func-call-spacing
                    import ('../views/bookstore/StoreSpeaking.vue')
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

// eslint-disable-next-line eol-last
export default router