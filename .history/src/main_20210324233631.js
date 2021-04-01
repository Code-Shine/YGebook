import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体图标
import './assets/styles/icon.css'
// 引入web字体
import './assets/fonts/daysOne.css'
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
        // eslint-disable-next-line eol-last
}).$mount('#app')