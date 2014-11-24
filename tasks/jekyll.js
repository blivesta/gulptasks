var gulp        = require('gulp');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var browserSync = require('browser-sync');
var config      = require('../../../gulpconfig').jekyll;

gulp.task('jekyll-build', function (done) {
  browserSync.notify(config.buildMessages);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});
