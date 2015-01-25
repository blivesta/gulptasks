var browserSync  = require('browser-sync');
var gulp         = require('gulp');
var less         = require('gulp-less');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var size         = require('gulp-size');
var gulpIf       = require('gulp-if');
var header       = require('gulp-header');
var config       = require('../../../gulpfile').less;
// var config       = require('../test/gulpfile').less; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpIf(config.headerBanner,header(config.banner, {
      pkg : config.pkg
    })))
    .pipe(less())
    .on('error', console.error.bind(console))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('.'))
    .pipe(gulpIf(config.jekyll, // for jekyll
      gulp.dest(config.jekyllPub)
    ))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: false, showFiles: true, title:'after Less'}));
};