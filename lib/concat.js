var gulp   = require('gulp');
var concat = require('gulp-concat');
var config = require('../../../gulpfile').concat;
// var config = require('../test/gulpfile').concat; //test

module.exports = function() {
  gulp.src(config.src)
    .pipe(concat(config.name))
    .pipe(gulp.dest(config.dest));
};
