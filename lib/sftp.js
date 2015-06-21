var gulp       = require('gulp');
var sftp       = require('gulp-sftp');

module.exports = function(opts) {

  return gulp.src(opts.src)
    .pipe(sftp(opts.options));

};
