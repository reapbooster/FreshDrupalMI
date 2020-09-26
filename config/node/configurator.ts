const pathUtility = require('path');
const webpack = require("webpack");
const PluginError = require("plugin-error");
const Logger = require('fancy-log');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DrupalLibrariesWebpackPlugin = require('drupal-libraries-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

export function parsePath(incoming) {
  const basename = pathUtility.basename(incoming, pathUtility.extname(incoming));
  return {
    full: pathUtility.resolve(incoming),
    dirname: pathUtility.dirname(incoming),
    basename: basename,
    libraryName: basename.replace('.entry', '')
  };
}

export function configurator(file) {
  const parsedFileName = parsePath(file);
  console.log(`Configuring: ${parsedFileName.libraryName}`)
  var babelLoader = {
    loader: 'babel-loader',
    options: {
      cacheDirectory: false,
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        "@babel/preset-react"
      ],
      plugins: [
        "@babel/transform-runtime",
        '@babel/plugin-transform-typescript',
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-class-properties",
        "transform-custom-element-classes",
        "@babel/plugin-transform-react-jsx",
        "babel-plugin-styled-components",
        ["babel-plugin-transform-builtin-classes", {
          "globals": ["Array", "Error", "HTMLElement"]
        }],
        "@babel/plugin-transform-classes"
      ]
    }
  };


  var toReturn = {
    entry: { },
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    cache: false,
    output: {
      filename: parsedFileName.libraryName + ".entry.js",
      path: pathUtility.resolve(parsedFileName.dirname),
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
      plugins: [

      ],
      alias: {
        components: pathUtility.resolve('./src/components'),
        DataTypes: pathUtility.resolve('./src/DataTypes'),
        Fields: pathUtility.resolve('./src/Fields'),
        Utility: pathUtility.resolve('./src/Utility'),
      }
    },

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            babelLoader
          ]
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ],
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new MiniCssExtractPlugin({ filename: "css/[name].css", chunkFilename: "css/[id].css"}),
      new DrupalLibrariesWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new BrowserSyncWebpackPlugin({
        proxy: "localhost:8080",
        notify: false,
        port: 3130,
        reloadDelay: 3000
      }),
    ],
    stats: {
      warnings: true,
      colors: true,
      modules: true,
      reasons: true,
      errorDetails: true
    }
  }
  toReturn.entry[parsedFileName.libraryName] = file;
  return toReturn;
};

export default configurator;
