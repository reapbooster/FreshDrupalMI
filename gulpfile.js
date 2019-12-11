const gulp  = require('gulp');
const shell = require('gulp-shell');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require("gulp-concat");

var drupalCoreBuild = shell.task('cd web/core && npm install && npm run build');
var clearDrupalCache = shell.task('drush cr');

function themeBuild() {
  return gulp.src("/var/www/web/themes/custom/milken/scss/milken.scss")
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(sourcemaps.write("../css"))
    .pipe(gulp.dest('/var/www/web/themes/custom/milken/css'));
}

function mergePackageJsonFiles() {
  return gulp.src("./**/package.json")
    .on('error', sass.logError)
    .pipe(concat('packages.json'))
    .pipe(gulp.dest('dist.json'));
}

exports.mergePackageJsonFiles = mergePackageJsonFiles;
exports.themeBuild = themeBuild;
exports.drupalCoreBuild = drupalCoreBuild;
exports.clearDrupalCache = clearDrupalCache;

exports.default = gulp.parallel(themeBuild, drupalCoreBuild);




