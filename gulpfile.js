/* eslint no-console: "error" */
/**
 * @file
 *
 */

const env = process.env.ENV === "live" ? "prod" : "dev";
const gulp = require("gulp");
const Logger = require('fancy-log');
const shell = require("gulp-shell");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const path = require("path");
const sourcemaps = require('gulp-sourcemaps');


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
  "tsCompile-milken",
  shell.task("tsc --esModuleInterop --resolveJsonModule", {
    cwd: path.resolve("./web/themes/custom/milken")
  })
);

gulp.task("themeBuild", () => {
  return gulp
    .src(path.resolve("./web/themes/custom/milken/scss/*.scss"))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(
      sass({
        allowEmpty: true,
        outputStyle: "compressed",
        includePaths: [
          "/var/www/web/themes/custom/milken/scss",
          "/var/www/web",
          "./web/themes/custom/milken/scss",
          "./web"
        ]
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.write("../css"))
    .pipe(gulp.dest("../css"));
});

gulp.task("buildComponents", done => {
  /* eslint-disable */
  const webpackConfigurator = require(`./web/themes/custom/milken/config/webpack.config.${env}`);
  gulp.src("./web/themes/custom/**/js/*.entry.tsx", { realpath: true })
    .pipe(webpackConfigurator());
  done();
});

gulp.task(
  "default",
  gulp.series(["tsCompile-milken", "themeBuild", "buildComponents"])
);

gulp.task('watch', () => {
  return gulp.watch('./web/themes/custom/milken/scss/*.scss', {}, gulp.series('themeBuild'));
});


