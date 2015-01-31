var gulp        = require('gulp');
var iconfont    = require('gulp-iconfont');
var rename      = require("gulp-rename");
var consolidate = require('gulp-consolidate');
var config      = require('../../../gulpfile').iconfont;
// var config      = require('../test/gulpfile').iconfont; //test

// css template
// https://github.com/cognitom/symbols-for-sketch/blob/master/templates/fontawesome-style.css

module.exports = function() {
  return gulp.src(config.svgSrc)
    .pipe(iconfont({ fontName: config.name }))
    .on('codepoints', function(codepoints) {
      var options = {
        glyphs: codepoints,
        fontName: config.name,
        fontPath: config.fontPath, // set path to font (from your CSS file if relative)
        className: config.name // set class name in your CSS
      };
      gulp.src(config.cssSrc)
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:config.name }))
        .pipe(gulp.dest(config.cssDest));

    })
    .pipe(gulp.dest(config.dest)); // set path to export your fonts
};