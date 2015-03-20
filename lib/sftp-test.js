var gulp       = require('gulp');
var sftp       = require('gulp-sftp');
var config     = require('../../../gulpfile').sftpTest;
// var config       = require('../test/gulpfile').sftpTest; //sftpStaging

module.exports = function() {
  return gulp.src(config.src)
    .pipe(sftp({
      config.options
    }));
};
