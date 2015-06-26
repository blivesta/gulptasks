var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');

module.exports = function(options) {

  return browserify(options.src, { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
    })
    .pipe(source(options.bundleName))
    .pipe(gulp.dest(options.dest));

};
