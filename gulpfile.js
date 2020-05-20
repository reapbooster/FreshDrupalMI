/**
 * @file
 * Eslint no-console: "error" .*/

/**
 * @file
 */

const env = process.env.ENV === "live" ? "prod" : "dev";
const gulp = require("gulp");
const shell = require("gulp-shell");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const path = require("path");
const sourcemaps = require('gulp-sourcemaps');
const gsgc = require('gulp-sass-generate-contents');
const print = require('gulp-print').default;

const basePath = path.resolve(".");
console.log(basePath);

// eslint-disable-next-line no-unused-vars.
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
    cwd: path.resolve(basePath, "web/themes/custom/milken")
  })
);

gulp.task("themeBuild", () => {
  return gulp
    .src(path.resolve(basePath, "web/themes/custom/milken/scss/*.scss"))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        allowEmpty: true,
        outputStyle: "compressed",
        includePaths: [
          path.resolve(basePath, "web/themes/custom/milken/scss"),
          path.resolve(basePath, "web"),
        ]
      }).on("error", (err) => {
        sass.logError(err);
        process.exit(1);
      })
    )
    .pipe(sourcemaps.write(path.resolve(basePath, "web/themes/custom/milken/css")))
    .pipe(print())
    .pipe(gulp.dest(path.resolve(basePath, "web/themes/custom/milken/css")));
});

gulp.task("buildComponents", done => {
  try {
    /* eslint-disable */
    const webpackConfigurator = require(`./web/themes/custom/milken/config/webpack.config.${env}`);
    gulp.src("./web/themes/custom/**/js/*.entry.tsx", { realpath: true })
      .pipe(webpackConfigurator());
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
  done();

});

gulp.task(
  "default",
  gulp.series(["tsCompile-milken", "themeBuild", "buildComponents"])
);

gulp.task('watch', () => {
  return gulp.watch('./web/themes/custom/milken/scss/*.scss', {}, gulp.series('themeBuild'));
});
