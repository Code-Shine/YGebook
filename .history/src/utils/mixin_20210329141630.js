import { mapGetters, mapActions } from 'vuex'

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible'
        ])
    },
    methods: {
        ...mapActions([
            'setMenuVisible',
            'setFileName',
            'settingVisible'
        ])
    }
    // eslint-disable-next-line eol-last
}