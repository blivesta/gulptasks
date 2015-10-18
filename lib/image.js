var gulp = require('gulp');
var image = require('gulp-image');

module.exports = function(options) {
  return gulp.src(options.src)
    .pipe(image(options.options))
    .pipe(gulp.dest(options.dest));
};
