/* eslint no-console: "error" */
/**
 * @file
 *
 */

const env = process.env.ENV === "live" ? "prod" : "dev";
const gulp = require("gulp");
const PluginError = require("plugin-error");
const Logger = require('fancy-log');
const shell = require("gulp-shell");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const path = require("path");
const webpack = require("webpack");

// eslint-disable-next-line no-unused-vars
function typescriptCompileCallback(error, stdout, stderr) {
  console.error(stderr);
  console.log(stdout);
  console.error(error);
}

gulp.task(
  "drupalCoreBuild",
  shell.task("cd web/core && npm install && npm run build")
);
gulp.task("clearDrupalCache", shell.task("drush cr"));
gulp.task(
  "tsCompile",
  shell.task("tsc --esModuleInterop --resolveJsonModule", {
    cwd: path.resolve("./web/themes/custom/milken")
  })
);
gulp.task("themeBuild", () => {
  return gulp
    .src(path.resolve("./web/themes/custom/milken/scss/milken.scss"))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(
      sass({
        allowEmpty: true,
        outputStyle: "expanded",
        includePaths: [
          "/var/www/web/themes/custom/milken/scss",
          "/var/www/web"
        ]
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.write("../css"))
    .pipe(gulp.dest(path.resolve("./web/themes/custom/milken/css")));
});

gulp.task("mergePackgageJsonFiles", done => {
  gulp.src("./**/package.json").pipe(() => {
    console.log(arguments);
  });
  return done();
});

gulp.task("buildComponents", done => {
  /* eslint-disable */
  const configurator = require(`./web/themes/custom/milken/config/webpack.config.${env}`);
  var config = configurator();
  config.entry = {
    HelloWorld: path.resolve('./web/themes/custom/milken/js/HelloWorld.entry.tsx')
  };
  webpack(config, (err, stats) => {
    if (err) {
      throw new PluginError('webpack:build', err);
    }
    Logger.info('[webpack:build]', stats.toString({
      colors: true
    }));
    done();
  });
});

gulp.task(
  "default",
  gulp.series(["tsCompile", "themeBuild", "buildComponents"])
);

gulp.task('watch', () => {
  return gulp.watch('./web/themes/custom/milken/scss/*.scss', {}, gulp.series('themeBuild'));
});
