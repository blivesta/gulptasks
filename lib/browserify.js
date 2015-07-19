var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

module.exports = function(options) {

  return browserify(options.src, { debug: true })
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
      this.emit('end');
    })
    .pipe(source(options.bundleName))
    .pipe(gulp.dest(options.dest));

};
