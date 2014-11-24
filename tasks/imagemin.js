var gulp     = require('gulp');
var newer    = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var size     = require('gulp-size');
var config   = require('../../../gulpconfig').imagemin;

gulp.task('imagemin', function() {
  return gulp.src(config.src)
    .pipe(newer(config.dest))
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: true, showFiles: true, title:'after imagemin'}));
});