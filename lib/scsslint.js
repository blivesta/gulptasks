var gulp     = require('gulp');
var scsslint = require('gulp-scss-lint');
var config  = require('../../../gulpfile').scsslint;
// var config  = require('../test/gulpfile').scsslint; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(scsslint(config.options));
};