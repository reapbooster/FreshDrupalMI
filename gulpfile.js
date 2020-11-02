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
const webpackStream = require("webpack-stream");
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
const clean = require("gulp-clean");

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

/**
 *  Build typescript before you do any of the others
 */

gulp.task(
  "buildTypescript",
  shell.task("tsc --esModuleInterop --resolveJsonModule", {
    cwd: path.resolve(basePath, "web"),
  })
);

/**
 * Build Drupal Stuff
 */

gulp.task(
  "buildDrupalCore",
  shell.task("cd web/core && npm install && npm run build")
);
gulp.task("clearDrupalCache", shell.task("drush cr"));

gulp.task("buildMilkenTheme", (done) => {
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
  "buildGinTheme",
  gulp.series([
    shell.task("yarn install && yarn build", {
      cwd: path.resolve(basePath, "web/themes/contrib/gin"),
    }),
    shell.task("cp -R web/themes/contrib/gin/dist/* web/themes/contrib/gin", {
      cwd: basePath,
    }),
  ])
);

/**
 * Build React components
 */

gulp.task("buildEntryFiles", (done) => {
  console.log("Building components.");
  const configurator = require("./config/node/configurator").default;
  try {
    const webpackConfig = configurator(glob.sync("./**/*.entry.tsx", {}));
    return wp(webpackConfig, (err, stats) => {
      if (err) {
        console.error(err.message);
        throw new err();
      }
      console.log("Compiled:", stats.toString());
      done();
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

/**
 * Synthetic tasks
 */

gulp.task(
  "themeBuild",
  gulp.parallel([
    "buildTypescript",
    "buildDrupalCore",
    "buildGinTheme",
    "buildMilkenTheme",
  ])
);

gulp.task("clean", (done) => {
  return gulp
    .src(
      [
        "./web/modules/custom/**/**/*.js",
        "./web/modules/custom/**/**/*.js.map",
        "./src/**/*.js",
        "./src/**/*.js.map",
      ],
      { sourcemaps: true }
    )
    .pipe(clean())
    .on("complete", () => {
      done();
    });
});

const gulpDefaultTask = gulp.series(["buildTypescript", "buildEntryFiles"]);

gulp.task("componentBuild", gulpDefaultTask);

gulp.task("default", gulpDefaultTask);
gulp.task(
  "build",
  gulp.series([
    "buildTypescript",
    gulp.parallel(["themeBuild", "componentBuild"]),
  ])
);

/**
 * Watches:
 */

gulp.task(
  "watchComponents",
  shell.task("webpack --watch --config=./webpack.config.js")
);

gulp.task(
  "watch",
  gulp.series(["clean", "buildTypescript", "watchComponents"])
);
