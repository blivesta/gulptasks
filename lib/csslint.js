var gulp    = require('gulp');
var csslint = require('gulp-csslint');
var config  = require('../../../gulpfile').csslint;
// var config  = require('../test/gulpfile').csslint; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(csslint(config.setting))
    .pipe(csslint.reporter());
};
