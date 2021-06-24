const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? this.baseSys
    //     : this.baseSys,
    // publicPath: process.env.VUE_APP_BASE_CONTENT,

    // webpack-dev-server 相关配置
    devServer: {
        port: process.env.VUE_APP_SYS_PORT,
        // port: 9005,
        // historyApiFallback: {
        //     index: process.env.VUE_APP_BASE_CONTENT + '/index.html'
        // },
        open: false,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
        proxy: {
            '': {
              target: 'http://10.8.0.25:9005/', // 域名
              //   target: 'http://10.8.0.186:9005/',
              //   target: 'http://10.81.8.34:9005/',
              changOrigin: true,
            }
          },
        // proxy: {
        //     '/proxyApi': {//代理api
        //         target: process.env.VUE_APP_PROXY_TARGET,//服务器api地址
        //         changeOrigin: true,//是否跨域
        //         ws: true, // proxy websockets
        //         pathRewrite: {//重写路径
        //             "^/proxyApi": ''
        //         }
        //     }
        // }
//
    },

    // 输出文件目录
    outputDir: 'dist',
    // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)

    // alias 配置
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"));
        // config.module.rules.delete("svg");
        // config.module
        //     .rule("svg-smart")
        //     .test(/\.svg$/)
        //     .include.add(resolve("src/icons/svg"))
        //     .end()
        //     .use("svg-sprite-loader")
        //     .loader("svg-sprite-loader")
        //     .options({
        //         symbolId: "[name]"
        //     });
    },
    configureWebpack: config => {
            let path = require('path')
            config.module.rules.push({
                test: path.resolve(__dirname, 'node_modules/leader-line/'),
                use: [
                    {
                        loader: 'skeleton-loader',
                        options: {
                            procedure: content => `${content}export default LeaderLine`
                        }
                    }
                ]
            })
        }
};