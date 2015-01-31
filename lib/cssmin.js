var gulp   = require('gulp');
var csso   = require('gulp-csso');
var rename = require('gulp-rename');
var size   = require('gulp-size');
var gzip   = require('gulp-gzip');
var config = require('../../../gulpfile').cssmin;
// var config = require('../test/gulpfile').cssmin; //test

module.exports = function() {
  gulp.src(config.src)
    .pipe(size({gzip: true, showFiles: true, title:'Before cssmin'}))
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dest))
    .pipe(gzip())
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: true, showFiles: true, title:'after cssmin'}));
};
