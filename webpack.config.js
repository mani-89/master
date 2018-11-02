// For info about this file refer to webpack and webpack-hot-middleware
// documentation
import webpack from 'webpack';
import path from 'path';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

let PROD = 'production',
    DEV = 'development',
    TEST = 'test';

export const settings = {
    api: {
        url: 'http://localhost/demo',
        secure: true
    },
    useApi: false
};

// function getGlobals(mode) {
//     let GLOBALS = {};

//     GLOBALS['process.env.NODE_ENV'] = JSON.stringify(mode);
//     GLOBALS['__DEV__'] = (mode == DEV)
//         ? false
//         : true;

//     // if (mode === DEV) {
//     //     // GLOBALS['window.useServerApi'] = JSON.stringify(settings.useApi);
//     //     // GLOBALS['window.apiPath'] = JSON.stringify(settings.api.url);
//     //     GLOBALS['GlobalVars'] = {};
//     // }
//     return GLOBALS;
// }

export function getConfig(mode, isDebug=false, isTest=false) {
    mode = isTest ? TEST : mode;
    // const GLOBALS = getGlobals(mode);
    let config = {};
    config.context = __dirname;
    config.resolve = {
        extensions: [
            '.js', '.jsx', '.json'
        ],
        modules: [path.join(__dirname, "src"), path.join(__dirname, "fusioncharts"), 'node_modules'],
        alias: {
            'src': path.join(__dirname, 'src')
        }
    };
   
    if(mode == DEV){
        config.devtool = 'eval-source-map'
    }

    config.entry = {        
        'home': [path.resolve(__dirname, 'src/home/index.js')]
    };
    if (mode == DEV) {
        for (let name in config.entry) {
            config
                .entry[name]
                .push("webpack-hot-middleware/client?name=" + name);
        }
    }
    config.entry.react = [
        "react",
        "react-router",
        "react-router-dom",
        "babel-polyfill"
    ];

    config.target = 'web'; // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    config.output = {
        path: path.resolve(__dirname, 'dist/js'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/dist/js/', //Note: On dev server, the bundled files are at root path. eg: access generated app.js at /app.js
        filename: '[name].js'
    };

    config.plugins = [
        // new webpack.DefinePlugin(),
        //new webpack.NoErrorsPlugin(),
        //new BundleAnalyzerPlugin(),
        new webpack
            .optimize
            .CommonsChunkPlugin({name : 'react', filename: 'react.js'})
    ];

    if (mode === DEV) {
        config
            .plugins
            .push(new webpack.HotModuleReplacementPlugin());
    }

    if (mode === PROD) {
        config
            .plugins
            .push(new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: false
            }));
    }

    let _providePlugins = {
        'Promise': 'es6-promise',
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    };

    config
        .plugins
        .push(new webpack.ProvidePlugin(_providePlugins));

 
    config.module = {};

    config.module.rules = [
        {test: /\.(js|jsx)?$/, exclude: /node_modules/, use: 'babel-loader'},
        {test: /(\.css|\.scss)$/, use: [{loader: 'style-loader'} , {loader: 'css-loader'}, {loader: 'sass-loader'}]},
        {test: /\.json$/, use: "json-loader"},
        {
            test: /\.(jpg|png)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[path][name].[hash].[ext]",
                },
            },
        },
        {
            test: /\.(jpg|png)$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 25000,
                },
            },
        },
    ];
    
    // config.externals = {

    // };
    // if (mode === DEV) {
    //     config.externals.GlobalVars = 'GlobalVars';
    // }

    return config;
}