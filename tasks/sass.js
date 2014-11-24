var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var gulpIf       = require('gulp-if');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var size         = require('gulp-size');
var browserSync  = require('browser-sync');
var config       = require('../../../gulpconfig').sass;

gulp.task('sass', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceComments: 'map',
      onError: browserSync.notify
    }))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('./'))
    .pipe(gulpIf(config.jekyll, // for jekyll
      gulp.dest(config.jekyllPub)
    ))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: false, showFiles: true, title:'after Sass'}));
});
