var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var config = require('../../../gulpfile').jshint;
// var config = require('../test/gulpfile').jshint; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
};
