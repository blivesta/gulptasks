var browsersync  = require('browser-sync');
var reload       = browsersync.reload;
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var filter       = require('gulp-filter');
var rubysass     = require('gulp-ruby-sass');
var sourcemaps   = require('gulp-sourcemaps');
var size         = require('gulp-size');
var config       = require('../../../gulpfile').rubysassBasic;
// var config       = require('../test/gulpfile').rubysassBasic; //test

module.exports = function() {

  config.onError = browsersync.notify;
  browsersync.notify(config.notify);

  return rubysass(config.src, config.options )
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
    .pipe(filter(config.filter))
    .pipe(reload({stream: true}))
    .pipe(size({
      gzip: false,
      showFiles: true,
      title:'after rubysass'
    }));

};
