var gulp     = require('gulp');
var svg2png  = require('gulp-svg2png');

module.exports = function(options) {

  return gulp.src(options.src)
    .pipe(svg2png(options.svg2png))
    .pipe(gulp.dest(options.dest));

};
