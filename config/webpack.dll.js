const path = require('path')
const webpack = require('webpack')


module.exports = {

    context: process.cwd(),
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less', '.css'],
        modules: [__dirname, 'node_modules']
    },
    entry: {
        library:[
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'axios'
        ],
    },

    output:{
        filename:'[name]_[hash].dll.js',
        path: path.join(__dirname,'../build/library'),
        library:'[name]'
    },
    plugins:[
        new webpack.DllPlugin({
            name:'[name]_[hash]',
            path: path.join(__dirname,'../build/library/[name].json'),
        })
    ]
}