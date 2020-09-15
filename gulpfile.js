/**
 * @file
 * Eslint no-console: "error" .*/

/**
 * @file
 */

const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');
const env = process.env.ENV === "live" ? "prod" : "dev";
const gulp = require("gulp");
const shell = require("gulp-shell");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const path = require("path");
const sourcemaps = require('gulp-sourcemaps');
const gsgc = require('gulp-sass-generate-contents');
const print = require('gulp-print').default;
const fs = require('fs').promises;
const basePath = path.resolve(".");
const themePath = path.resolve(basePath, "web/themes/custom/milken");
const modulesPath = path.resolve(basePath, "web/modules/custom");

const oldPath = path.resolve('web/themes/custom/milken/js/drupalTranslations.js');
// Delete this file if exists.
(async () => {
  try {
    await fs.unlink(oldPath);
  } catch (e) {
    // File does not exist... carry on.
  }
})();

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
  "tsCompile",
  shell.task("tsc --esModuleInterop --resolveJsonModule", {
    cwd: path.resolve(basePath, "web")
  })
);

gulp.task("themeBuild", (done) => {
  return gulp
    .src(path.resolve(basePath, "web/themes/custom/milken/scss/*.scss"))
    .pipe(sourcemaps.init())
    .on('end', (complete) => {
      console.debug("ending", complete);
      done();
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    })
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

gulp.task(
  "buildComponents",
  (done) => {
    console.log("Building components.");
    try {
      const webpackConfigurator = require(`./config/node/webpack.config`);
      /* eslint-disable */
      gulp.src('**/*.entry.tsx', { sourcemaps: false, cwd: path.join(basePath, 'web') })
        .on('end', (complete) => {
          console.debug("ending", complete);
          done();
        })
        .on('error', (err) => {
          console.error(err);
          process.exit(1);
        })
        .pipe(webpackConfigurator())
    }
    catch (err) {
      console.log(err);
      process.exit(1);
    }
  });

gulp.task(
  "buildChangedComponents",
  (done) => {
    console.log("Building changed components.");
    try {
      const webpackConfigurator = require(`./config/node/webpack.config`);
      /* eslint-disable */
      gulp.src('**/*.entry.tsx', { sourcemaps: false, cwd: path.join(basePath, 'web') })
        .on('end', (complete) => {
          console.debug("ending", complete);
          done();
        })
        .on('error', (err) => {
          console.error(err);
          process.exit(1);
        })
        .pipe(changed('./web'))
        .pipe(webpackConfigurator())
    }
    catch (err) {
      console.log(err);
      process.exit(1);
    }
  });


gulp.task(
  "default",
  gulp.series(["tsCompile", gulp.parallel(["themeBuild", "buildComponents"])])
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
      './src/**' + tsxPattern,
      './src/**/*.scss'
    ];

  gulp.watch('./web/themes/custom/milken/scss/*.scss', {}, gulp.series('themeBuild'));
  gulp.watch(files, gulp.series('buildChangedComponents'));

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
