var gulp       = require('gulp');
var sftp       = require('gulp-sftp');

module.exports = function(options) {

  return gulp.src(options.src)
    .pipe(sftp(options.options));

};
