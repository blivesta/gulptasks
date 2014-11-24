var gulp        = require('gulp');
var browserSync = require('browser-sync');
var config      = require('../gulpconfig').browserSync;

gulp.task('browserSync', function() {
  browserSync.init(null, config);
});
