var autoprefixer = require('autoprefixer');
var filter       = require('gulp-filter');
var gulp         = require('gulp');
var header       = require('gulp-header');
var gulpIf       = require('gulp-if');
var rubysass     = require('gulp-ruby-sass');
var postcss      = require('gulp-postcss');
var pixrem       = require('pixrem');
var colorRgba    = require('postcss-color-rgba-fallback');
var opacity      = require('postcss-opacity');
var sourcemaps   = require('gulp-sourcemaps');
var size         = require('gulp-size');

module.exports = function(opts) {

  var prefix = [
    autoprefixer(opts.autoprefixer)
  ];

  var fallback = [
    colorRgba,
    opacity,
    pixrem
  ];

  return rubysass(opts.src, opts.rubySassOptions )
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(postcss(prefix))
    .pipe(gulpIf(opts.fallback,
      postcss(fallback)
    ))
    .pipe(gulpIf(opts.headerBanner,
      header(opts.banner, {
        pkg : opts.pkg
      })
    ))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(opts.dest))
    .pipe(filter(opts.filter))
    .pipe(size());
};
