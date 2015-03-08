var gulp        = require('gulp');
var stylestats  = require('gulp-stylestats');
var config      = require('../../../gulpfile').stylestats;
// var config      = require('../test/gulpfile').stylestats; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(stylestats());
};
