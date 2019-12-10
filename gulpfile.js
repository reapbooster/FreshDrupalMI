const gulp  = require('gulp');
const shell = require('gulp-shell');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

var drupalCoreBuild = shell.task('cd web/core && npm install && npm run build');


function themeBuild() {
  return gulp.src("./web/themes/custom/milken/scss/milken.scss")
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./web/themes/custom/milken/css'));
}

exports.themeBuild = themeBuild;
exports.drupalCoreBuild = drupalCoreBuild;

exports.default = gulp.parallel(themeBuild, drupalCoreBuild);




