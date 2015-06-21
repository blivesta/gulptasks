var gulp   = require('gulp');
var concat = require('gulp-concat');
var size   = require('gulp-size');

module.exports = function(opts) {

  return gulp.src(opts.src)
    .pipe(concat(opts.name))
    .pipe(gulp.dest(opts.dest))
    .pipe(size());

};
