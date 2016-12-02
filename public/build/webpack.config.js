var webpack = require("webpack"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    WebpackNotifierPlugin = require('webpack-notifier'),
    extend = require('extend'),
    utils = require('./utils.js'),
    path= require('path');


var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 2 });

var entry_file = utils.add_prefix(require('./entry.js'), './public/');
var alias_file = utils.add_prefix(require('./alias.js'), './public/');

var common = {
    common: [
        'jquery',
        'underscore',
        'react',
        'react-dom',
    ]
}

entry_file = extend(common, entry_file);

var env = process.env.NODE_ENV;

module.exports =  {
    watch: env === 'prod' ? false : true,
    entry: entry_file,
    debug: env === 'prod' ? false : true,
    devtool: 'source-map',
    output: {
        path: path.resolve(process.cwd(), 'dist/'),
        filename: '[name].js',
        chunkFilename: '[name].min.js',
        publicPath: path.resolve(process.cwd(), 'dist/')
    },
    resolve: {
        alias: utils.addResolve(extend(alias_file)) 
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                context: 'public/global/lib/',
                from: '**/*',
                to: 'lib'
            },
            //{
                //from: 'img',
                //to: 'img'
            //}
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'underscore',
            React: 'react',
            ReactDOM: 'react-dom',
            global: 'global'
        }),
        new WebpackNotifierPlugin({
            title: 'Webpack 编译成功',
            //contentImage: path.resolve(process.cwd(), './global/img/logo.png'),
            alwaysNotify: true
        }),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin("[name].css"),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        }),
        new HappyPack({
            id: 'js',
            loaders: [ 'babel'],
            threadPool: happyThreadPool
        }),
        new HappyPack({
          id: 'css',
          threadPool: happyThreadPool,
          loaders: [ 'css-loader?sourceMap&-convertValues' ]
        }),
        new HappyPack({
          id: 'scss',
          threadPool: happyThreadPool,
          loaders: [ 'css-loader?sourceMap&-convertValues!sass-loader?sourceMap' ]
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)|(global\/lib\/)/,
                loader: 'babel-loader',
                query: { // 参数
                    presets: ['es2015', 'react', 'stage-0']
                },
                happy: {id: 'js'} 
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'happypack/loader?id=css')
            },{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'happypack/loader?id=scss')
            }, {
                test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
                loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
            }, {
                test: /\.html/,
                loader: "html-loader?" + JSON.stringify({
                    minimize: false,
                    attrs:false
                })
            }, {
                test: /\.json$/,
                loader: "json"
            }
        ]
    }
}
