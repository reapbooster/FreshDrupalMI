/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  mode: "production",
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  cache: true,
  output: {
    filename: '[id].js',
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use:[
          {
            loader: "ts-loader",
            options: {
              "configFileName": "/var/www/web/themes/custom/milken/config/tsconfig-frontend.json"
            }
          }
        ]},

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
    warnings: false
  }
};
