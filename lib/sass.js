var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-ruby-sass');
var gulpIf       = require('gulp-if');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var size         = require('gulp-size');
var header       = require('gulp-header');
var pkg          = require('../../../package.json');
var config       = require('../../../gulpfile').sass;
// var pkg          = require('../package.json'); //test
// var config       = require('../test/gulpfile').sass; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(gulpIf(config.headerBanner,header(config.banner, { pkg : pkg } )))
    .pipe(sass({
      style:'expanded',
      precision: 10,
      sourcemap: true
    }))
    .on('error', console.error.bind(console))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({ browsers:config.autoprefixer }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulpIf(config.jekyll, // for jekyll
      gulp.dest(config.jekyllPub)
    ))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: false, showFiles: true, title:'after Sass'}));
};