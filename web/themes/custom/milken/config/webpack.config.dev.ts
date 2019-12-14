/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = () => {
  const path = require('path');
  const webpackFailPlugin = require('webpack-fail-plugin');
  const webpack = require('webpack-cli');
  const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

  var babelLoader = {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [
        "react",
        [
          "es2015",
          {
            "modules": false
          }
        ],
        "es2016"
      ]
    }
  };

  var tsLoader = {
    loader: "ts-loader",
    options: {
      configFile: path.resolve('./web/themes/custom/milken/config/tsconfig-frontend.json'),
      logInfoToStdOut: true,
      logLevel: 'info'
    }
  };


  return {
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    cache: true,
    entry: {

    },
    output: {
      filename: '[name].js',
      path: path.resolve('./web/themes/custom/milken/components')
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            tsLoader,
            babelLoader
          ]
        },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve('./web/themes/custom/milken/config/tsconfig-frontend.json'),
        logInfoToStdOut: true,
        logLevel: 'info'
      }),
      webpackFailPlugin
    ],
    stats: {
      warnings: false
    }
  }
};
