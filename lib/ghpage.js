var gulp   = require('gulp');
var ghpage = require('gulp-gh-pages');
var config = require('../../../gulpfile').ghpage;
// var config = require('../test/gulpfile').ghpage; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(ghpage(config));
};