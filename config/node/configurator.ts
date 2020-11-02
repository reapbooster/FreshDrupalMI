const { v4: uuidv4 } = require("uuid");
const pathUtility = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DrupalLibrariesWebpackPlugin = require("drupal-libraries-webpack-plugin");
const OnlyIfChangedPlugin = require("only-if-changed-webpack-plugin");

const oicOpts = {
  rootDir: process.cwd(),
  devBuild: process.env.NODE_ENV !== "production",
};

const babelLoader = {
  loader: "babel-loader",
  options: {
    sourceType: "unambiguous",
    cacheDirectory: true,
    presets: [
      "@babel/preset-env",
      "@babel/preset-typescript",
      "@babel/preset-react",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-transform-classes",
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-typescript",
      "babel-plugin-styled-components",
    ],
    exclude: [
      // \\ for Windows, \/ for Mac OS and Linux
      /node_modules[\/]core-js/,
      /node_modules[\/]webpack[\/]buildin/,
    ],
  },
};

export function parsePath(incoming) {
  const basename = pathUtility.basename(
    incoming,
    pathUtility.extname(incoming)
  );
  return {
    full: pathUtility.resolve(incoming),
    dirname: pathUtility.dirname(incoming),
    basename: basename,
    relativeDirectory: pathUtility.relative(".", pathUtility.dirname(incoming)),
    libraryName: basename.replace(".entry", ""),
  };
}

export function configurator(entry) {
  if (typeof entry === "string") {
    entry = [entry];
  }
  const parsedFileNames = entry.map(parsePath);
  console.log(
    `Configuring: `,
    parsedFileNames.map((item) => {
      return item.libraryName;
    })
  );

  const toReturn = {
    entry: {},
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    cache: false,
    optimization: {
      chunkIds: "natural",
      noEmitOnErrors: false,
      moduleIds: "natural",
      providedExports: false,
      sideEffects: false,
      splitChunks: {
        chunks: "async",
        minSize: 20000,
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
    output: {
      filename: "[name].entry.js",
      path: pathUtility.resolve("."),
      jsonpFunction: uuidv4(),
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
        bootstrap: pathUtility.resolve("./web/libraries/bootstrap"),
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
        },
        {
          test: /\.css$/i,
          use: ["sass-to-string", "style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "sass-to-string",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  outputStyle: "compressed",
                },
              },
            },
          ],
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
      /**
       *  new BrowserSyncWebpackPlugin({
       *   proxy: "http://localhost:8080",
       *   notify: false,
       *   port: 3130,
       *   reloadDelay: 3000
       * }),
       *
       */
      new OnlyIfChangedPlugin({
        cacheDirectory: pathUtility.join(oicOpts.rootDir, "tmp/cache"),
        cacheIdentifier: oicOpts, // all variable opts/environment should be used in cache key
      }),
    ],
    stats: {
      warnings: true,
      colors: true,
      modules: true,
      reasons: true,
      errorDetails: true,
    },
  };
  for (const key in entry) {
    toReturn.entry[
      pathUtility.join(
        parsedFileNames[key].relativeDirectory,
        parsedFileNames[key].libraryName
      )
    ] = entry[key];
  }
  return toReturn;
}

export default configurator;
