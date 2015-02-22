var gulp         = require('gulp');
var size         = require('gulp-size');
var banner       = require('gulp-header');
var config       = require('../../../gulpfile').banner;
// var config       = require('../test/gulpfile').banner; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(banner(config.banner, {
      pkg : config.pkg
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(size({
      gzip: false,
      showFiles: false,
      title:'after banner'
    }));
};
