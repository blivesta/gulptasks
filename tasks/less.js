var gulp = require('gulp');
var less = require('gulp-less');
// var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var size = require('gulp-size');
var config = require('../gulpconfig').less;

gulp.task('less', function() {
  return gulp.src(config.src)
    // .pipe(sourcemaps.init())
    .pipe(less())
    // .pipe(sourcemaps.write())
    // .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer(config.autoprefixer))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: false, showFiles: true, title:'after Less'}));
});
