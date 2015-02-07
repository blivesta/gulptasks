var gulp         = require('gulp');
var size         = require('gulp-size');
var header       = require('gulp-header');
// var config       = require('../../../gulpfile').header;
var config       = require('../test/gulpfile').header; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(header(config.banner, {
      pkg : config.pkg
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: false, showFiles: true, title:'after banner'}));
};
