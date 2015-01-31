var gulp     = require('gulp');
var newer    = require('gulp-newer');
var image    = require('gulp-image');
var config   = require('../../../gulpfile').imgmin;
// var config   = require('../test/gulpfile').imgmin; //test

module.exports = function() {
  gulp.src(config.src)
    .pipe(newer(config.dest))
    .pipe(image())
    .pipe(gulp.dest(config.dest));
};