var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var config = require('../../../gulpconfig').jshint;

gulp.task('jshint', function() {
  return gulp.src(config.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
