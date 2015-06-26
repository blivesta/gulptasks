var autoprefixer = require('autoprefixer');
var gulp         = require('gulp');
var gulpIf       = require('gulp-if');
var header       = require('gulp-header');
var rubysass     = require('gulp-ruby-sass');
var postcss      = require('gulp-postcss');
var pixrem       = require('pixrem');
var rgba         = require('postcss-color-rgba-fallback');
var opacity      = require('postcss-opacity');
var sourcemaps   = require('gulp-sourcemaps');
var size         = require('gulp-size');
var pkg          = require(process.cwd() + '/package.json');

module.exports = function(options) {

  options = options || {};
  options.banner = options.banner !== undefined ? options.banner : false;
  options.banner.content = options.banner.content !== undefined ? options.banner.content : '';
  options.banner.pkg = options.banner.pkg !== undefined ? options.banner.pkg : pkg;

  var fallback = [];

  if(options.fallback.autoprefixer){
     fallback.push(autoprefixer(options.fallback.autoprefixer))
  } else {
     fallback.push(autoprefixer())
  };
  if(options.fallback.opacity){  fallback.push(opacity) };
  if(options.fallback.rgba){  fallback.push(rgba) };
  if(options.fallback.pixrem){  fallback.push(pixrem) };

  return rubysass(options.src, options.rubySass )
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(gulpIf(options.banner,
      header(options.banner.content, {
        pkg : options.banner.pkg
      })
    ))
    .pipe(postcss(fallback))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(options.dest))
    .pipe(size());
};
