var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gzip   = require('gulp-gzip');
var size   = require('gulp-size');
var config = require('../../../gulpfile').jsmin;
// var config = require('../test/gulpfile').jsmin; //test

module.exports = function() {
  gulp.src(config.src)
    .pipe(size({gzip: true, showFiles: true, title:'Before jsmin'}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.dest))
    .pipe(gzip())
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: true, showFiles: true, title:'After jsmin'}));
};