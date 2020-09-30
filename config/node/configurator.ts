const pathUtility = require('path');
const fs = require('fs');
const webpack = require("webpack");
const PluginError = require("plugin-error");
const Logger = require('fancy-log');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DrupalLibrariesWebpackPlugin = require('drupal-libraries-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');
const BabelLoaderOptions = JSON.parse(fs.readFileSync(pathUtility.resolve(process.env.PWD,'.babelrc.json')).toString());

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
        Components: pathUtility.resolve('./src/Components'),
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
            {
              loader: 'babel-loader',
              options: BabelLoaderOptions
            }
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
      /**
       *  new BrowserSyncWebpackPlugin({
       *   proxy: "http://localhost:8080",
       *   notify: false,
       *   port: 3130,
       *   reloadDelay: 3000
       * }),
       *
       */
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
