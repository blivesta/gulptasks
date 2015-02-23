var gulp     = require('gulp');
var useref   = require('gulp-useref');
var assets   = useref.assets();
var config   = require('../../../gulpfile').useref;
// var config   = require('../test/gulpfile').useref; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref(config.options))
    .pipe(gulp.dest(config.dest));
};
