var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

module.exports = function(options) {
  return gulp.src(options.src)
    .pipe(imagemin(options.options))
    .pipe(gulp.dest(options.dest));
};
