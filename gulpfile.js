"use strict";

const gulp            = require('gulp'),
      shell           = require('gulp-shell'),
      sass            = require('gulp-sass'),
      sourcemaps      = require('gulp-sourcemaps'),
      autoprefixer    = require('gulp-autoprefixer'),
      concat          = require("gulp-concat"),
      path            = require('path');

function typescriptCompileCallback(error, stdout, stderr) {
  console.error(stderr);
  console.log(stdout);
  console.error(error);
};

gulp.task('drupalCoreBuild', shell.task('cd web/core && npm install && npm run build'));
gulp.task('clearDrupalCache', shell.task('drush cr'))
gulp.task('tsCompile',shell.task('tsc --esModuleInterop --resolveJsonModule'));
gulp.task('themeBuild', () => {
  return gulp.src("/var/www/web/themes/custom/milken/scss/milken.scss")
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({
      'allowEmpty': true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write("../css"))
    .pipe(gulp.dest('/var/www/web/themes/custom/milken/css'))
    .on('error', typescriptCompileCallback);
});

gulp.task('mergePackgageJsonFiles', (done) => {
  gulp.src("./**/package.json")
    .on('error', sass.logError)
    .pipe(() => {
      console.log(arguments);
    });
  return done();
});


gulp.task('default', gulp.series(['tsCompile', 'drupalCoreBuild', 'themeBuild']))


