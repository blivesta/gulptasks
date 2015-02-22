var browsersync  = require('browser-sync');
var reload       = browsersync.reload;
var gulp         = require('gulp');
var less         = require('gulp-less');
var filter       = require('gulp-filter');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var size         = require('gulp-size');
var config       = require('../../../gulpfile').less;
// var config       = require('../test/gulpfile').less; //test

// var LessPluginAutoPrefix = require('less-plugin-autoprefix');
// var autoprefix = new LessPluginAutoPrefix({ browsers: [config.autoprefixer] });

module.exports = function() {
  config.onError = browsersync.notify;
  browsersync.notify(config.notify);

  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(less({
      // plugins: autoprefix
    }))
    .pipe(less(config.options))
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
    .pipe(filter(config.filter))
    .pipe(reload({stream:true}))
    .pipe(size({
      gzip: false,
      showFiles: true,
      title:'After Less'
    }));
};


