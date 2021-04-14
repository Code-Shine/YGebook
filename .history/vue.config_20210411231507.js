module.exports = {
    // 获取css、html的路径全都是通过baseUrl来获取的
    // 通过process.env的环境变量的NODE_ENV,当其为production即开发模式的时候
    // 我们将baseUrl设置为./,表示获取当前路径下,在vue-cli3.3中baseURL被publicPath给替代了
    // 而如果是测试或是开发模式时候我们仍然通过 /
    publicPath: process.env.NODE_ENV === 'production' ?
        './' : '/'
        // eslint-disable-next-line eol-last
}