/* eslint-disable @typescript-eslint/no-var-requires */
const Stream = require('stream');
const path = require('path');
const webpack = require("webpack");
const PluginError = require("plugin-error");
const Logger = require('fancy-log');


function parsePath(incoming) {
  const basename = path.basename(incoming, path.extname(incoming));
  return {
    full: path.resolve(incoming),
    dirname: path.dirname(incoming),
    basename: basename,
    libraryName: basename.replace('.entry', '')
  };
}

module.exports = () => {
  var configurator = (name, file) => {
    const parsedFileName = parsePath(file);
    console.log(`Configuring: ${parsedFileName.libraryName}`)
    var babelLoader = {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          '@babel/preset-env'
        ],
        plugins: [
          "@babel/transform-runtime",
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-class-properties",
          "transform-custom-element-classes"
        ]
      }
    };

    var toReturn = {
      entry: {},
      mode: "development",
      // Enable sourcemaps for debugging webpack's output.
      devtool: "source-map",
      cache: true,
      output: {
        filename: parsedFileName.libraryName + ".entry.js",
        path: parsedFileName.dirname
      },
      resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
        plugins: [

        ],
        alias: {
          components: path.resolve('./src/components')
        }
      },

      module: {
        rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
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
      plugins: [
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

  var stream = new Stream.Transform({ objectMode: true });


  stream._transform = function(originalFile, unused, callback) {
    var file = originalFile.clone({ contents: false });
    var parsedPath = parsePath(file.path);
    console.log(`tranforming ${parsedPath.libraryName}!`);
    var webPackConfig = configurator(parsedPath.libraryName, parsedPath.full);
    webpack(webPackConfig, (err, stats) => {
      if (err) {
        throw new PluginError('webpack:build', err);
        process.exit(1);
      }
      Logger.info('[webpack:build]', stats.toString({
        colors: true
      }));
    });
    callback(null, file);
  };
  return stream;
}

