var gulp   = require('gulp');
var concat = require('gulp-concat');
var size   = require('gulp-size');

module.exports = function(options) {

  return gulp.src(options.src)
    .pipe(concat(options.name))
    .pipe(gulp.dest(options.dest))
    .pipe(size());

};
