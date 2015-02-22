var gulp   = require('gulp');
var concat = require('gulp-concat');
var config = require('../../../gulpfile').concat2nd;
// var config = require('../test/gulpfile').concat2nd; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(concat(config.name))
    .pipe(gulp.dest(config.dest));
};
