export const FONT_SIZE_LIST = [
    { fontSize: 12 },
    { fontSize: 14 },
    { fontSize: 16 },
    { fontSize: 18 },
    { fontSize: 20 },
    { fontSize: 22 },
    { fontSize: 24 }
    // eslint-disable-next-line eol-last
]

export const FONT_FAMILY = [
    { font: 'Default' },
    { font: 'Cabin' },
    { font: 'Days One' },
    { font: 'Montserrat' },
    { font: 'Tangerine' }
    // eslint-disable-next-line eol-last
]

export function themeList(vue) {
    return [{
                alias: vue.$t('book.themeDefault'),
                name: 'Default',
                style: {
                    body: {
                        color: '#4c5059',
                        background: '#cecece'
                    }
                }
            },
            {
                alias: vue.$t('book.themeGold'),
                name: 'Gold',
                style: {
                    body: {
                        color: '#5c5b56',
                        background: '#c6c2b6'
                    }
                }
            },
            {
                alias: vue.$t('book.themeEye'),
                name: 'Eye',
                style: {
                    body: {
                        'color': '#404c42',
                        'background': '#a9c1a9',
                        'padding-top': `${realPx(48)}px!important`,
                        'padding-bottom': `${realPx(48)}px!important`
                    }
                ]
                // eslint-disable-next-line eol-last
            }