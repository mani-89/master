// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {settings, getConfig} from '../webpack.config';
import path from 'path';
import proxy from 'http-proxy-middleware';

let config = getConfig('development');
const bundler = webpack(config);
let middlewares = [
      
      historyApiFallback(),
     
      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // These settings suppress noisy webpack output so only errors are displayed to the console.
        noInfo: true,
        quiet: true,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        },
         // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler) ]
const paths = ["/api/**",]; // Auth paths
paths.map(key=>{
  middlewares.unshift( proxy(key, {
      target: settings.api.url,
      changeOrigin: true,
      logLevel: "debug",
      secure: settings.api.secure,
      onProxyReq(proxyReq, req, res) {
        if (key !== '/Common') {
          proxyReq.setHeader('Content-Type', 'application/json');
        }
          
      },
      onProxyRes(proxyRes, req, res){
        delete proxyRes.headers['Access-Control-Allow-Origin'];
      }
    }));
});

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  port: 3000,
  ui: {
    port: 3001
  },
  startPath: '/',
  server: {
    baseDir: [path.resolve(__dirname, '../'), path.resolve(__dirname, '../../')],
    middleware:middlewares
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    '**/*.html',
    '**/*.css'
  ]
});
