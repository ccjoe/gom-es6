var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var path_gom = path.join(__dirname, 'app/gom');
var path_app = path.join(__dirname, 'app');
var path_out = path.join(__dirname, '.tmp');

var webpackConfig =  [
    //编译构建框架部分
    {   name: 'GOM',
        entry:  path.join(path_gom, 'src/gom.js'),
        output: {
            path: path_out,
            filename: 'gom.js',
            libraryTarget: "var",    // export itself to a global var
            library: "Gom"           // name of the global var: "Gom"
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',             //loader name
                    test:  path.join(path_gom, 'src'),  //独立的配置在webpackConfig
                    query: {
                        presets: 'es2015'
                    },
                }
            ]
        },
        plugins: [
            new webpack.NoErrorsPlugin()    // Avoid publishing files when compilation fails
        ]
    },
    //编译构建 APP 部分
    {   name: 'APP',
        entry:  path.join(__dirname, 'app/scripts/app.js'),
        output: {
            path: path_out,
            filename: 'app.js'
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',             //loader name
                    test:  path_app,  //独立的配置在webpackConfig
                    query: {
                        presets: 'es2015'
                    },
                }
            ]
        },
        plugins: [
            new webpack.NoErrorsPlugin()    // Avoid publishing files when compilation fails
        ]
    }, {
        name: 'SCSS',
        // The standard entry point and output config
        entry: {
            gom: path.join(path_gom, 'src/styles/gom.scss'),
            app: path.join(path_app, 'styles/main.scss')
        },
        output: {
            filename: "[name].js",
            chunkFilename: "[id].js"
        },
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("style", "css!sass")
                }
            ]
        },
        // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
        plugins: [
            new ExtractTextPlugin("[name].css")
        ]
    }
];

//公用部分配置
var webpackCommon = {
    stats: {
        colors: true     // Nice colored output
    },
    devtool: 'source-map', // Create Sourcemaps for the bundle
        devServer: {
        contentBase: './app',
            hot: true
    }
};

//混合配置
webpackConfig.forEach(function(config){
    Object.assign(config, webpackCommon);
});


module.exports = webpackConfig;
