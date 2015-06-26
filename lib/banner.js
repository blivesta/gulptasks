var gulp         = require('gulp');
var banner       = require('gulp-header');

module.exports = function(options) {

  return gulp.src(options.src)
    .pipe(banner(options.banner, {
      pkg : options.pkg
    }))
    .pipe(gulp.dest(options.dest))

};
