const webpack = require("webpack");
const path = require('path');

process.env.NODE_ENV = 'test';
const testReportsDir = 'ReactUI/tools/tests';
const defaultReportArea = true;

// Karma configuration

module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: '../../',
    browsers: ['Chrome'],
    colors: true,
    frameworks: ['jasmine'],
    files: [
      // 'ReactUI/dist/styles/extra/material.js',
      // 'ReactUI/dist/styles/extra/material.css',
      'ReactUI/node_modules/whatwg-fetch/fetch.js',
      // , {
      //   pattern: "Scripts/**/*.js",
      //   watched: false,
      //   served: true,
      //   included: false
      // },
      'ReactUI/dist/js/react.js', {
        pattern: "ReactUI/dist/js/**/*.js",
        watched: false,
        served: true,
        included: false
      },
       {
        pattern: "ReactUI/dist/styles/**/*.css",
        watched: false,
        served: true,
        included: false
      }, {
        pattern: 'ReactUI/tools/tests.index.js',
        watched: false,
        served: true,
        included: true
      }
    ],
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO
    logLevel: config.LOG_INFO,
    client: {
      captureConsole: false
    },
    port: 9876,
    preprocessors: {
      'ReactUI/tools/tests.index.js': ['webpack', 'sourcemap']
    },
    reporters: [
      'progress', 'html', 'coverage'
    ],
    coverageReporter: {
      reporters: [
        {
          type: 'html',
          dir: testReportsDir,
          subdir: 'html'
        }
      ]
    },
    htmlReporter: {
      outputFile: testReportsDir + '/UnitTestReport.html',
      // Optional
      pageTitle: 'Unit Tests',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true
    },
    singleRun: true,
    failOnEmptyTestSuite: false,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
        //  {test: /\.js$/, exclude: function (modulePath) {
        //       if (modulePath.match(/node_modules/)) {
        //         return true;
        //       }
        //     },
        //     use: 'isparta-loader'
        //   },
        {test: /\.(js|jsx)?$/, exclude: /node_modules/, use: 'babel-loader'},
        {test: /(\.css|\.scss)$/, use: [{loader: 'style-loader'} , {loader: 'css-loader'}, {loader: 'sass-loader'}]},
        {test: /\.json$/, use: "json-loader"}    
        ]
      },
      resolve: {
        extensions: [
          '.js', '.jsx', '.json'
        ],
        modules: [
          path.join(__dirname, "../src"),
          path.join(__dirname, "../node_modules"),
        ],
        alias: {
          'src': path.join(__dirname, '../src'),
        }
      },
      plugins: [
        //new webpack.NoErrorsPlugin()
        new webpack.ProvidePlugin(
          // 'Promise': 'es6-promise',
          // 'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        )
      ],
      stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window',
        'react/addons': true, // For enzyme,
      }
    },
    webpackServer: {
      noInfo: true,
      quiet: true
    }    
  });
};