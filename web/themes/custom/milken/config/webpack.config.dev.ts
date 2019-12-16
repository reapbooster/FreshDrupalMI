/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = () => {
  const path = require('path');


  var babelLoader = {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread'
      ]
    }
  };



  return {
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    cache: true,
    output: {
      filename: '[name].entry.js',
      path: path.resolve('./web/themes/custom/milken/js')
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
      plugins: [

      ],
      alias: {
        components: path.resolve('./src/components/')
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
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
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
};
