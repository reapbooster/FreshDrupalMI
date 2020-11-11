/* eslint-disable @typescript-eslint/no-var-requires */
const Stream = require("stream");
const pathUtility = require("path");
const webpack = require("webpack");
const PluginError = require("plugin-error");
const Logger = require("fancy-log");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DrupalLibrariesWebpackPlugin = require("drupal-libraries-webpack-plugin");
const BrowserSyncWebpackPlugin = require("browser-sync-webpack-plugin");
const postcssImageSet = require("postcss-image-set-polyfill");
const OnlyIfChangedPlugin = require("only-if-changed-webpack-plugin");
const progressCallback = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};

function parsePath(incoming) {
  const basename = pathUtility.basename(
    incoming,
    pathUtility.extname(incoming)
  );
  return {
    full: pathUtility.resolve(incoming),
    dirname: pathUtility.dirname(incoming),
    basename: basename,
    libraryName: basename.replace(".entry", ""),
  };
}

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      parser: "postcss-js",
      plugins: [postcssImageSet],
    },
    execute: true,
  },
};

module.exports = () => {
  const configurator = (name, file) => {
    const parsedFileName = parsePath(file);
    console.log(`Configuring: ${parsedFileName.libraryName}`);
    const babelLoader = {
      loader: "babel-loader",
      options: {
        exclude: [
          // \\ for Windows, \/ for Mac OS and Linux
          /node_modules[\\\/]core-js/,
          /node_modules[\\\/]webpack[\\\/]buildin/,
        ],
        cacheDirectory: false,
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          "@babel/preset-react",
        ],
        plugins: [
          "@babel/transform-runtime",
          "@babel/plugin-transform-typescript",
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-class-properties",
          "transform-custom-element-classes",
          "@babel/plugin-transform-react-jsx",
          "babel-plugin-styled-components",
          [
            "babel-plugin-transform-builtin-classes",
            {
              globals: ["Array", "Error", "HTMLElement"],
            },
          ],
          "@babel/plugin-transform-classes",
          new webpack.ProvidePlugin({
            "window.Holder": "holderjs",
          }),
        ],
      },
    };
    const onlyIfChangedOptions = {
      rootDir: process.cwd(),
      devBuild: process.env.NODE_ENV !== "production",
      filename: parsedFileName.libraryName + ".entry.js",
      path: parsedFileName.dirname,
    };
    const toReturn = {
      entry: {},
      mode: "development",
      // Enable sourcemaps for debugging webpack's output.
      devtool: "source-map",
      cache: false,
      output: {
        filename: parsedFileName.libraryName + ".entry.js",
        path: parsedFileName.dirname,
      },
      resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
        plugins: [],
        alias: {
          Components: pathUtility.resolve("./src/Components"),
          DataTypes: pathUtility.resolve("./src/DataTypes"),
          Fields: pathUtility.resolve("./src/Fields"),
          Utility: pathUtility.resolve("./src/Utility"),
        },
      },

      module: {
        rules: [
          {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [babelLoader],
          },
          {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader",
            exclude: /node_modules/,
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", postCSSLoader],
          },
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader", postCSSLoader],
          },
        ],
      },
      plugins: [
        new webpack.LoaderOptionsPlugin({
          debug: true,
        }),
        new MiniCssExtractPlugin({
          filename: "css/[name].css",
          chunkFilename: "css/[id].css",
        }),
        new DrupalLibrariesWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncWebpackPlugin(),
        new webpack.ProgressPlugin(progressCallback),
        new OnlyIfChangedPlugin({
          cacheDirectory: path.join(onlyIfChangedOptions.rootDir, "tmp/cache"),
          cacheIdentifier: onlyIfChangedOptions, // all variable opts/environment should be used in cache key
        }),
      ],
      stats: {
        warnings: true,
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true,
      },
      optimization: {
        noEmitOnError: true,
        splitChunks: {
          chunks: process.env.NODE_ENV == "production" ? "all" : "async",
          minSize: 20000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: "~",
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    };
    toReturn.entry[parsedFileName.libraryName] = file;
    return toReturn;
  };

  const stream = new Stream.Transform({ objectMode: true });

  stream._transform = function (originalFile, unused, callback) {
    const file = originalFile.clone({ contents: false });
    const parsedPath = parsePath(file.path);
    console.log(`tranforming ${parsedPath.full}!`);
    const webPackConfig = configurator(parsedPath.libraryName, parsedPath.full);
    webpack(webPackConfig, (err, stats) => {
      if (err) {
        throw new PluginError("webpack:build", err);
        process.exit(1);
      }
      Logger.info(
        "[webpack:build]",
        stats.toString({
          colors: true,
        })
      );
    });
    callback(null, file);
  };
  return stream;
};
