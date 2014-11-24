var gulp   = require('gulp');
var del    = require('del');
var config = require('../../../gulpconfig').clean;

gulp.task('clean', del.bind(null, [
  config.files
]));
