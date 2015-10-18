var gulp   = require('gulp');
var csso   = require('gulp-csso');
var rename = require('gulp-rename');
var size   = require('gulp-size');

module.exports = function(options) {

  return gulp.src(options.src)
    .pipe(csso(options.csso))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(options.dest))
    .pipe(size());

};
