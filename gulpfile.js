const gulp  = require('gulp');
const shell = require('gulp-shell');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require("gulp-concat");

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
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(sourcemaps.write("../css"))
    .pipe(gulp.dest('/var/www/web/themes/custom/milken/css'));
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


