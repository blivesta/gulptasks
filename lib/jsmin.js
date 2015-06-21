var gulp   = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var size   = require('gulp-size');

module.exports = function(opts) {

  return gulp.src(opts.src)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(opts.dest))
    .pipe(gulp.dest(opts.dest))
    .pipe(size());

};
