import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'

Vue.use(VueI18N)

const messages = {
    en,
    cn
}

const locale = 'cn'

const i18n = new VueI18N({
    locale,
    messages
})

// eslint-disable-next-line eol-last
export default i18n