var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var config = require('../../../gulpfile').jshint;
// var config = require('../test/gulpfile').jshint; //test

module.exports = function() {
  gulp.src(config.src)
    .pipe(jshint(config.setting))
    .pipe(jshint.reporter('jshint-stylish'));
};
