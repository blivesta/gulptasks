var gulp         = require('gulp');
var rubysass     = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var size         = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var header       = require('gulp-header');
var config       = require('../../../gulpfile').rubysass;
// var config       = require('../test/gulpfile').rubysass; //test

module.exports = function() {
  return rubysass(config.src, { sourcemap: true })
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(gulpIf(config.headerBanner,header(config.banner, {
      pkg : config.pkg
    })))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
    .pipe(size({gzip: false, showFiles: true, title:'after rubysass'}));
};
