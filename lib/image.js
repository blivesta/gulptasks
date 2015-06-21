var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

module.exports = function(opts) {
  return gulp.src(opts.src)
    .pipe(imagemin(opts.options))
    .pipe(gulp.dest(opts.dest));
};
