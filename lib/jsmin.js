var gulp   = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var size   = require('gulp-size');

module.exports = function(options) {

  return gulp.src(options.src)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(options.dest))
    .pipe(gulp.dest(options.dest))
    .pipe(size());

};
