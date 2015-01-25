var gulp      = require('gulp');
var bump      = require('gulp-bump');
var config    = require('../../../gulpfile').bump;
// var config    = require('../test/gulpfile').bump; //test

module.exports = function() {
  var version   = config.version;
  gulp.src(config.src)
    .pipe(bump({version: version}))
    .pipe(gulp.dest(config.dest));
};