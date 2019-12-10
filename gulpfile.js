const { src, dest, parallel } = require('gulp');
const shelljs = require('shelljs');


function drupalCoreBuild() {
  return shelljs.exec('cd web/core && npm install && npm run build');
}


function themeBuild() {
  console.log("theme build");
  return true;
}

exports.themeBuild = themeBuild;
exports.drupalCoreBuild = drupalCoreBuild;

exports.default = parallel(themeBuild, drupalCoreBuild);




