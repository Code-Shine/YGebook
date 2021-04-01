import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'
import { getLocale, saveLocale } from '../utils/localStorage'

Vue.use(VueI18N)

const messages = {
    en,
    cn
}

let locale = getLocale()
    // 当localstorage中没有locale的时候，将其默设置为cn,并保存进去
if (!locale) {
    locale = 'cn'
    saveLocale(locale)
}

const i18n = new VueI18N({
    locale,
    messages
})

// eslint-disable-next-line eol-last
export default i18n