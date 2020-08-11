/**
 * @file
 * Eslint no-console: "error" .*/

/**
 * @file
 */

const browserSync = require('browser-sync').create();
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
const themePath = path.resolve(basePath, "web/themes/custom/milken");
const modulesPath = path.resolve(basePath, "web/modules/custom");

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
    // .pipe(sourcemaps.init())
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
    // .pipe(sourcemaps.write(path.resolve(basePath, "web/themes/custom/milken/css")))
    .pipe(print())
    .pipe(gulp.dest(path.resolve(basePath, "web/themes/custom/milken/css")));
});

gulp.task(
  "buildComponents",
  (done) => {

    console.log("Building components.");
    try {
      /* eslint-disable */
      const webpackConfigurator = require(`./config/node/webpack.config.${env}`);
      gulp.src('**/js/*.entry.tsx', { sourcemaps: false, cwd: modulesPath })
        .pipe(webpackConfigurator())
      gulp.src('js/*.entry.tsx', { sourcemaps: false, cwd: themePath })
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
  gulp.parallel(["tsCompile-milken", "themeBuild", "buildComponents"])
);

gulp.task('browsersync-reload', function (done) {
    browserSync.reload({ stream: true });
    done();
});

gulp.task('watch', () => {

  var tsxPattern = '/*.tsx';
  var files = [
      './' + themePath + '/js/**' + tsxPattern,
      './' + modulesPath + '/**' + tsxPattern,
      './src/components/**' + tsxPattern
    ];

  gulp.watch('./web/themes/custom/milken/scss/*.scss', {}, gulp.series('themeBuild'));
  gulp.watch(files, gulp.series('buildComponents'));

  // TODO: When using proxy nothing renders (?!)
  var jsPattern = '/**/*.tsx';
  var bsfiles = [
    './' + themePath + jsPattern,
    modulesPath + '/**/js' + jsPattern,
    './src/components' + jsPattern
  ];
  browserSync.init(
    bsfiles,
    {
      proxy: "localhost:8080",
      notify: false,
      port: 3000,
      reloadDelay: 3000
    }
  );

});
