var gulp   = require('gulp');
var jshint = require('gulp-jshint');

module.exports = function(opts) {
  return gulp.src(opts.src)
    .pipe(jshint(opts.jshintPath))
    .pipe(jshint.reporter('jshint-stylish'));
};
