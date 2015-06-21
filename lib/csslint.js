var gulp    = require('gulp');
var csslint = require('gulp-csslint');

module.exports = function(opts) {

  return gulp.src(opts.src)
    .pipe(csslint(opts.csslintPath))
    .pipe(csslint.reporter())
    .pipe(csslint.failReporter());

};
