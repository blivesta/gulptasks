var autoprefixer = require('autoprefixer-core');
var gulp         = require('gulp');
var gulpIf       = require('gulp-if');
var header       = require('gulp-header');
var mqpacker     = require('css-mqpacker');
var rubysass     = require('gulp-ruby-sass');
var postcss      = require('gulp-postcss');
var pixrem       = require('pixrem');
var rgba         = require('postcss-color-rgba-fallback');
var opacity      = require('postcss-opacity');
var sourcemaps   = require('gulp-sourcemaps');
var size         = require('gulp-size');

module.exports = function(options) {

  options = options || {};
  options.banner = options.banner !== undefined ? options.banner : false;
  options.banner.content = options.banner.content !== undefined ? options.banner.content : '';
  options.banner.pkg = options.banner.pkg !== undefined ? options.banner.pkg : '';

  var postProcessors = [];
  postProcessors.push(autoprefixer(options.postcss.autoprefixer));
  if(options.postcss.opacity){postProcessors.push(opacity)};
  if(options.postcss.rgba){postProcessors.push(rgba)};
  if(options.postcss.pixrem){postProcessors.push(pixrem)};
  if(options.postcss.mqpacker){postProcessors.push(mqpacker)};

  return rubysass(options.src, options.rubySass )
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(gulpIf(options.banner,
      header(options.banner.content, {
        pkg : options.banner.pkg
      })
    ))
    .pipe(postcss(postProcessors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(options.dest))
    .pipe(size());
};
