var gulp    = require('gulp');
var csslint = require('gulp-csslint');
var config  = require('../gulpconfig').csslint;

gulp.task('csslint', function() {
  return gulp.src(config.src)
    .pipe(csslint())
    .pipe(csslint.reporter());
});
