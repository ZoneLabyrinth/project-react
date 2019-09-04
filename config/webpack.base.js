
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const argv = require('yargs-parser')(process.argv.slice(2))
// const _mode = process.env.NODE_ENV || 'development'
const _mode = argv.mode || 'development'
const _mergeConfig = require(`./webpack.${_mode === "production" ? "prod" : "dev"}.js`)
const _modeflag = _mode === 'production' ? true : false
//webpack优化
// 提示框
const WebpackBuildNotifyerPlugin = require('webpack-build-notifier')
// 进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// dashboard
// const DashboardPlugin = require('webpack-dashboard/plugin')
// 打包速度
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
// const ManifestPlugin = require('webpack-manifest-plugin')

//构建信息提示工具 必须与stats使用
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
//压缩
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

//css优化
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');
const fs = require('fs');

const PATHS = {
    src: path.join(__dirname, '../src')
}

//主题定制 theme.less在styles中
function getLessVariables(file) {
    var themeContent = fs.readFileSync(file, 'utf-8')
    var variables = {}
    themeContent.split('\n').forEach(function (item) {
        //只要每一行有‘//’注释符号，此行会被忽略，建议所有样式注释单列一行
        if (item.indexOf('//') > -1 || item.indexOf('/*') > -1) {
            return
        }
        var _pair = item.split(':')
        if (_pair.length < 2) return;
        var key = _pair[0].replace('\r', '').replace('@', '')
        if (!key) return;
        var value = _pair[1].replace(';', '').replace('\r', '').replace(/^\s+|\s+$/g, '')
        variables[key] = value
    })
    return variables
}

const theme = getLessVariables(path.resolve(__dirname, '../src/assets/styles/theme.less'))




let webpackConfig = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash:5].js',
        publicPath: '/'
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                //多线程编译
                use: [{
                    loader: 'thread-loader',
                    options: {
                        workers: 3
                    }
                },
                    'babel-loader?cacheDirectory=true']
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require("postcss-flexbugs-fixes"),
                                postcssAspectRatioMini({}),
                                postcssPxToViewport({
                                    viewportWidth: 750, // (Number) The width of the viewport. 
                                    viewportHeight: 1334, // (Number) The height of the viewport. 
                                    unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
                                    viewportUnit: 'vw', // (String) Expected units. 
                                    selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px. 
                                    minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
                                    mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
                                }),
                                postcssWriteSvg({
                                    utf8: false
                                }),
                                postcssCssnext({}),
                                postcssViewportUnits({}),
                                cssnano({
                                    // preset: "advanced", 
                                    autoprefixer: false,
                                    "postcss-zindex": false
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    { loader: 'less-loader', options: { modifyVars: theme } },
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg|blob)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
            "src": path.resolve(__dirname, "../src"),
            "@": path.resolve(__dirname, "../src/components"),
            "pages": path.resolve(__dirname, "../src/pages"),
            "api": path.resolve(__dirname, '../src/api')
        }
    },
    optimization: {
        splitChunks: {
            //达到最小打包体积大小（0即引入即打包）
            minSize: 0,
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'common',
                    //最小引入次数
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [

        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            // filename:'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html',
            // chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserVeLineBreaks: false,
                minifyCSS: true,
                minifiJS: true,
                removeComments: false
            },
        }),
        new HtmlWebpackTagsPlugin({
            tags: [`${require('../build/library/library.json').name}.js`],
            append: false
        }),
        new MiniCssExtractPlugin({
            filename: _modeflag ? 'styles/[name].[hash:5].css' : 'styles/[name].css',
            chunkFilename: _modeflag ? 'styles/[id].[hash:5].css' : 'styles/[id].css'
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
        new WebpackBuildNotifyerPlugin({
            title: 'project-react',
            suppressSuccess: true
        }),
        new HardSourceWebpackPlugin(),
        new ProgressBarPlugin(),
        // new DashboardPlugin()
        // new ManifestPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        // function () {
        //     // webpack4 
        //     this.hooks.done.tap('done', (stats) => {
        //         if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
        //             // 打印错误信息
        //             console.log('build error')
        //             //退出，跑出错误码为1
        //             process.exit(1)
        //         }
        //     })
        // }
    ],
    //仅构建错误显示信息，此为build模式下，dev模式加在dev对象里
    // stats: 'errors-only'
}


// module.exports = smp.wrap(merge(_mergeConfig, webpackConfig))
module.exports = merge(_mergeConfig, webpackConfig)

