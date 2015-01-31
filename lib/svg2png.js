var gulp     = require('gulp');
var svg2png  = require('gulp-svg2png');
var config   = require('../../../gulpfile').svg2png;
// var config   = require('../test/gulpfile').svg2png; //test

module.exports = function() {
  return gulp.src(config.src)
    .pipe(svg2png())
    .pipe(gulp.dest(config.dest));
};