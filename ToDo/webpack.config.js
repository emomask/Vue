const VueLoaderPlugin = require('vue-loader/lib/plugin');//vue-loader插件必须设置

module.exports = {
  mode: 'development',//development开发环境 //production生产环境 
  entry: __dirname + '/src/index.js',//入口
  output:{
    filename:'bundle.js',
    path:__dirname + '/dist/',
    publicPath:"/dist/"
  },//出口
  module:{
    rules:[
      {test : /\.vue$/,loader:'vue-loader',
        options: {
          hotReload: true // 关闭热重载
        }
      },
      //css文件打包配置
      {test : /\.css$/,use: ['vue-style-loader','css-loader']},
      //JS文件打包配置
      {test : /\.js$/,loader:'babel-loader'},
      //图片打包配置
      {
        test : /\.(gif|jpg|jpge|png|svg)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              name:'[name].[ext]',
              limit:10000,
              publicPath: '/src/static/images/',
              outputPath:'/src/static/images/'
            }
          }
        ]
      }
      //...
    ]
  },//配置loader
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
    'vue': 'vue/dist/vue.min.js'
    }
  },
  devServer: {
    //我们在这里对webpack-dev-server进行配置
    // contentBase: "./", 
    // historyApiFallback:true,
    // inline:true,
    // hot:true,
    port:'80'
  }
  
}