// const webapck = require('webpack')
const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const ASSET_PATH = process.env.ASSET_PATH || './';
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  
  devtool: 'source-map', // 体积小
  //多线程压缩
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true
      })
    ],
  },
  plugins: [

    //压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    
    new CopyWebpackPlugin([
      { from: 'build/library', to: '' },
    ]),
    //体积分析。可无
    new BundleAnalyzerPlugin(),
    // 分包
    new webpack.DllReferencePlugin({
      // context: path.join(__dirname, '../'),
      scope:'var',
      manifest:require(path.resolve(__dirname,'../build/library/library.json')),
    })

    // //定义全局环境
    // new webapck.DefinePlugin({
    //     'process.env.NODE_ENV':JSON.stringify('production'),
    //     "process.env.ASSET_PATH":JSON.stringify(ASSET_PATH)
    // })
  ],
  mode: 'production',
}
