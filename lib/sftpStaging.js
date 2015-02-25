var gulp       = require('gulp');
var sftp       = require('gulp-sftp');
var config     = require('../../../gulpfile').sftpStaging;
// var config       = require('../test/gulpfile').less; //sftpStaging

module.exports = function() {
  return gulp.src(config.src)
    .pipe(sftp({
      config.options
    }));
};
