/**
 * @file
 */

"use strict";

const gulp         = require('gulp'),
      gutil        = require('gulp-util'),
      shell        = require('gulp-shell'),
      sass         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      concat       = require("gulp-concat"),
      path         = require('path'),
      webpack      = require('webpack'),
      fs           = require('fs');

function typescriptCompileCallback(error, stdout, stderr) {
  console.error(stderr);
  console.log(stdout);
  console.error(error);
};

gulp.task('drupalCoreBuild', shell.task('cd web/core && npm install && npm run build'));
gulp.task('clearDrupalCache', shell.task('drush cr'))
gulp.task('tsCompile',
  shell.task(
    'tsc --esModuleInterop --resolveJsonModule',
    {
      "cwd": "./web/themes/custom/milken"
    })
);
gulp.task('themeBuild', () => {
  return gulp.src("/var/www/web/themes/custom/milken/scss/milken.scss")
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({
      allowEmpty: true,
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write("../css"))
    .pipe(gulp.dest('/var/www/web/themes/custom/milken/css'));
});

gulp.task('mergePackgageJsonFiles', (done) => {
  gulp.src("./**/package.json")
    .pipe(() => {
      console.log(arguments);
    });
  return done();
});

gulp.task('buildComponents', (done) => {
  const componenentsDir = path.resolve('./web/themes/custom/milken/components');
  const env = (process.env.ENV == 'live') ? 'prod' : 'dev';
  const configurator = require(`./web/themes/custom/milken/config/webpack.config.${env}`);
  var files = fs.readdirSync(componenentsDir);
  var webpackConfig = configurator();
  for (var idx in files) {
    if (fs.lstatSync(path.join(componenentsDir, files[idx])).isDirectory()) {
      webpackConfig.entry[files[idx]] = path.resolve(path.join(componenentsDir, files[idx], 'index'));
    }
  }
  webpack(webpackConfig, (err, stats) => {
    if (err) {
        throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    done();
  });
});





gulp.task('default', gulp.series(['tsCompile', 'themeBuild', 'buildComponents']));
