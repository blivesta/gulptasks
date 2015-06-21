var gulp     = require('gulp');
var svg2png  = require('gulp-svg2png');

module.exports = function(opts) {

  return gulp.src(opts.src)
    .pipe(svg2png(opts.svg2png))
    .pipe(gulp.dest(opts.dest));

};
