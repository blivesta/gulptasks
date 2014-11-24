var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var config     = require('../gulpconfig').jsmap;

gulp.task('jsmap', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest));
});