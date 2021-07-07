const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    
    // webpack-dev-server 相关配置
    devServer: {
        port: process.env.VUE_APP_SYS_PORT,
        open: false,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
        proxy: {
        '': {
            target: 'http://192.168.2.29:18001/', // 域名
            changOrigin: true,
        }
        },
    },

    // 输出文件目录
    outputDir: 'dist',
    // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)

    // alias 配置
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"));
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