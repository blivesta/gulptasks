var gulp       = require('gulp');
var sftp       = require('gulp-sftp');
var config     = require('../../../gulpfile').sftpProduction;
// var config       = require('../test/gulpfile').less; //sftpProduction

module.exports = function() {
  return gulp.src(config.src)
    .pipe(sftp({
      config.options
    }));
};
