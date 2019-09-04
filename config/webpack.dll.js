const path = require('path')
const webpack = require('webpack')


module.exports = {
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
        filename:'[name]_[hash].js',
        path: path.join(__dirname,'../build/library'),
        library:'[name]'
    },
    plugins:[
        new webpack.DllPlugin({
            // context: path.join(__dirname, '../'),
            name:'[name]_[hash]',
            path: path.join(__dirname,'../build/library/[name].json'),
        })
    ]
}