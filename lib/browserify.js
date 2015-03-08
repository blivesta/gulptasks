var gulp         = require('gulp');
var browserify   = require('browserify');
var gulpIf       = require('gulp-if');
var sourcemaps   = require('gulp-sourcemaps');
var size         = require('gulp-size');
var uglify       = require('gulp-uglify');
var transform    = require('vinyl-transform');
var config       = require('../../../gulpfile').browserify;
// var config       = require('../test/gulpfile').browserify; //test

var getBundleName = function () {
  var version = config.version;
  var name = config.name;
  return version + '.' + name + '.' + 'min';
};

module.exports = function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(config.src)
    .pipe(browserified)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpIf(config.uglify,
      uglify(config.uglifyOptions)
    ))
    .pipe(sourcemaps.write(config.sourcemapPath))
    .pipe(gulp.dest(config.dest))
    .pipe(size({
      gzip: true,
      showFiles: true
    }));
};
