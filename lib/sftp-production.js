var gulp       = require('gulp');
var sftp       = require('gulp-sftp');
var config     = require('../../../gulpfile').sftpProduction;
// var config       = require('../test/gulpfile').sftpProduction;

module.exports = function() {
  return gulp.src(config.src)
    .pipe(sftp({
      config.options
    }));
};
