/**
 * @file
 * Eslint no-console: "error" . */

/**
 * @file
 */

const browserSync = require("browser-sync").create();
const changedInPlace = require("gulp-changed-in-place");
const wp = require("webpack");
const glob = require("glob");

const env = process.env.ENV === "live" ? "prod" : "dev";
const gulp = require("gulp");
const shell = require("gulp-shell");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const path = require("path");
const sourcemaps = require("gulp-sourcemaps");
const gsgc = require("gulp-sass-generate-contents");
const print = require("gulp-print").default;
const fs = require("fs").promises;
const Logger = require("fancy-log");

const basePath = path.resolve(".");
const themePath = path.resolve(basePath, "web/themes/custom/milken");
const modulesPath = path.resolve(basePath, "web/modules/custom");

const oldPath = path.resolve(
  "web/themes/custom/milken/js/drupalTranslations.js"
);
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
    cwd: path.resolve(basePath, "web"),
  })
);
gulp.task("milkenThemeBuild", (done) => {
  return gulp
    .src(path.resolve(basePath, "web/themes/custom/milken/scss/*.scss"))
    .pipe(sourcemaps.init())
    .on("end", (complete) => {
      console.debug("ending", complete);
      done();
    })
    .on("error", (err) => {
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
        ],
      }).on("error", (err) => {
        sass.logError(err);
        process.exit(1);
      })
    )
    .pipe(
      sourcemaps.write(path.resolve(basePath, "web/themes/custom/milken/css"))
    )
    .pipe(print())
    .pipe(gulp.dest(path.resolve(basePath, "web/themes/custom/milken/css")));
});

gulp.task(
  "ginThemeBuild",
  shell.task("yarn install && yarn build", {
    cwd: path.resolve(basePath, "web/themes/contrib/gin"),
  })
);

gulp.task('buildEntryFiles', (done) => {
  console.log("Building components.");
  const configurator = require("./config/node/configurator").default;
  try {
    const webpackConfigs = glob.sync("./**/*.entry.tsx", {}).map((file) => {
      return configurator(file);
    });
    wp(webpackConfigs, (err, stats) => {
      if (err) {
        throw new PluginError("webpack:build", err);
        process.exit(1);
      }
      Logger.info(
        "[webpack:build]",
        stats.toString({
          colors: true,
        })
      );
      done();
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

gulp.task("themeBuild", gulp.parallel(["milkenThemeBuild", "ginThemeBuild"]));

gulp.task("buildComponents", gulp.series(['tsCompile', 'buildEntryFiles']) );

gulp.task(
  "default",
  gulp.series(["tsCompile", gulp.parallel(["themeBuild", "buildComponents"])])
);

gulp.task('watchComponents', (done) => {
  const configurator = require("./config/node/configurator").default;
  try {
    const webpackConfigs = glob.sync("./**/*.entry.tsx", {}).map((file) => {
      var toReturn = configurator(file);
      toReturn.watch = true;
      return toReturn;
    });
    wp(webpackConfigs, (err, stats) => {
      if (err) {
        throw new PluginError("webpack:build", err);
        process.exit(1);
      }
      Logger.info(
        "[webpack:build]",
        stats.toString({
          colors: true,
        })
      );
      //TODO: browsersync trigger
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})

gulp.task("watch", gulp.series(['tsCompile', 'watchComponents']));
