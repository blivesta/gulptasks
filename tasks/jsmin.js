var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gzip   = require('gulp-gzip');
var size   = require('gulp-size');
var config = require('../../../gulpconfig').jsmin;

gulp.task('jsmin', function() {
  return gulp.src(config.src)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.dest))
    .pipe(gzip())
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: true, showFiles: true, title:'after jsmin'}));
});