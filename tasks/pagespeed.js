var gulp      = require('gulp');
var pagespeed = require('psi');
var config    = require('../gulpconfig').pagespeed;

gulp.task('pagespeed', pagespeed.bind(null, {
  url: config.product,
  strategy: 'mobile'
}));

gulp.task('pagespeed-dev', pagespeed.bind(null, {
  url: config.develop,
  strategy: 'mobile'
}));
