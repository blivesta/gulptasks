var gulp   = require('gulp');
var jshint = require('gulp-jshint');

module.exports = function(options) {
  return gulp.src(options.src)
    .pipe(jshint(options.jshintPath))
    .pipe(jshint.reporter('jshint-stylish'));
};
