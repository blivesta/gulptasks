var gulp   = require('gulp');
var concat = require('gulp-concat');
var config = require('../../../gulpfile').concatSub;
// var config = require('../test/gulpfile').concatSub; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(concat(config.name))
    .pipe(gulp.dest(config.dest));
};
