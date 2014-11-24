var gulp   = require('gulp');
var concat = require('gulp-concat');
var config = require('../../../gulpconfig').concat;

gulp.task('concat', function() {
  return gulp.src(config.src)
    .pipe(concat(config.name))
    .pipe(gulp.dest(config.dest));
});