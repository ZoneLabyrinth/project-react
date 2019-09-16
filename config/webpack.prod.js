// const webapck = require('webpack')
const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const ASSET_PATH = process.env.ASSET_PATH || './';
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')

const PATHS = {
  src: path.join(__dirname, '../src')
}

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

    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    // new CopyWebpackPlugin([
    //   { from: 'build/library', to: '' },
    // ]),
    //体积分析。可无
    new BundleAnalyzerPlugin(),
    // 分包
    new webpack.DllReferencePlugin({
      context: __dirname,
      // scope:'var',
      manifest:require('../build/library/library.json'),
    })

  ],
  mode: 'production',
}
