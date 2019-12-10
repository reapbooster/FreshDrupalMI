const gulp  = require('gulp');
const shell = require('gulp-shell');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');


var drupalCoreBuild = shell.task('cd web/core && npm install && npm run build');


function themeBuild() {
  return gulp.src("./web/themes/custom/milken/scss/milken.scss")
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass()).on('error', sass.logError)
    .pipe(sourcemaps.write("../css"))
    .pipe(gulp.dest('../css'));
}

exports.themeBuild = themeBuild;
exports.drupalCoreBuild = drupalCoreBuild;

exports.default = gulp.parallel(themeBuild, drupalCoreBuild);




