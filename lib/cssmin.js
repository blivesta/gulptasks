var gulp   = require('gulp');
var csso   = require('gulp-csso');
var rename = require('gulp-rename');
var size   = require('gulp-size');

module.exports = function(opts) {

  return gulp.src(opts.src)
    .pipe(csso(opts.csso))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(opts.dest))
    .pipe(size());

};
