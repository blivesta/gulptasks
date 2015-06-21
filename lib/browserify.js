var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');

module.exports = function(opts) {

  return browserify(opts.src, { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
    })
    .pipe(source(opts.bundleName))
    .pipe(gulp.dest(opts.dest));

};
