var gulp    = require('gulp');
var csslint = require('gulp-csslint');

module.exports = function(options) {

  return gulp.src(options.src)
    .pipe(csslint(options.csslintPath))
    .pipe(csslint.reporter())
    .pipe(csslint.failReporter());

};
