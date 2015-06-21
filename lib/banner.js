var gulp         = require('gulp');
var banner       = require('gulp-header');

module.exports = function(opts) {

  return gulp.src(opts.src)
    .pipe(banner(opts.banner, {
      pkg : opts.pkg
    }))
    .pipe(gulp.dest(opts.dest))

};
