import { mapGetters } from 'vuex'

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible'
        ])
    }
    // eslint-disable-next-line eol-last
}