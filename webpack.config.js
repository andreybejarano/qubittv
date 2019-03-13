'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('./package.json');

const isDebug = !process.argv.includes('--env.production');
const isVerbose = process.argv.includes('--verbose');

const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const staticAssetName = '[name].[ext]';

const config = {
  context: path.resolve(__dirname, './'),

  name: 'client',

  target: 'web',

  entry: {
    client: ['babel-polyfill', './src/client/client.js']
  },

  resolve: {
    modules: ['node_modules', 'src/client']
  },

  output: {
    path: path.resolve(__dirname, './dist/static'),
    publicPath: '/static/',
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js'
  },

  plugins: [
    // Extract all CSS files and compile it on a single file
    new ExtractTextPlugin({
      filename: '[name].[contenthash:base64:8].css',
      publicPath: '/static/css',
      allChunks: true
    }),

    // Define free variables
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true
    }),

    // Emit a file with assets paths
    new AssetsPlugin({
      path: path.resolve(__dirname, './dist'),
      filename: 'assets.json',
      prettyPrint: true
    }),

    // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource)
    }),

    ...(isDebug
      ? [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
      ]
      : [
        // Decrease script evaluation time
        new webpack.optimize.ModuleConcatenationPlugin(),

        // Minimize all JavaScript output of chunks
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            screw_ie8: true,
            warnings: isVerbose,
            unused: true,
            dead_code: true
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          }
        })
      ])
  ],
  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,
    rules: [
      // Rules for JS / JSX
      {
        test: reScript,
        include: [
          path.resolve(__dirname, './src/client')
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDebug,
          babelrc: false,
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: pkg.browserslist,
                  forceAllTransforms: !isDebug
                },
                modules: false,
                useBuiltIns: false,
                debug: false
              }
            ],
            'stage-0',
            'flow',
            'react'
          ],
          plugins: [
            'transform-decorators-legacy',
            ...(isDebug ? ['transform-react-jsx-source'] : []),
            ...(isDebug ? ['transform-react-jsx-self'] : [])
          ]
        }
      },
      // Rules for Style Sheets
      {
        test: reStyle,
        rules: [
          // Process internal/project styles (from client folder)
          {
            include: [path.resolve(__dirname, './src/client')],
            use: ExtractTextPlugin.extract({
              fallback: 'isomorphic-style-loader', // Convert CSS into JS module
              use: [
                // Process internal/project styles (from client folder)
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: isDebug,
                    modules: true,
                    camelCase: 'dashes',
                    localIdentName: isDebug
                      ? '[name]-[local]-[hash:base64:5]'
                      : '[hash:base64:5]',
                    minimize: !isDebug,
                    discardComments: { removeAll: true }
                  }
                },
                // Apply PostCSS plugins including autoprefixer
                {
                  loader: 'postcss-loader',
                  options: {
                    config: {
                      path: './postcss.config.js'
                    }
                  }
                }
              ]
            })
          }
        ]
      },
      // Return public URL for all assets unless explicitly excluded
      // DO NOT FORGET to update `exclude` list when you adding a new loader
      {
        exclude: [reScript, reStyle, /\.json$/, /\.txt$/, /\.md$/],
        loader: 'file-loader',
        options: {
          name: staticAssetName
        }
      }

    ]
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,
  cache: isDebug,

  // Choose a developer tool to enhance debugging
  devtool: isDebug ? 'cheap-module-inline-source-map' : 'source-map',

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

module.exports = config;
