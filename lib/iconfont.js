var gulp        = require('gulp');
var iconfont    = require('gulp-iconfont');
var rename      = require("gulp-rename");
var consolidate = require('gulp-consolidate');
// css template
// https://github.com/cognitom/symbols-for-sketch/blob/master/templates/fontawesome-style.css

module.exports = function(options) {

  return gulp.src(options.svgSrc)
    .pipe(iconfont({ fontName: options.name }))
    .on('codepoints', function(codepoints) {
      var options = {
        glyphs: codepoints,
        fontName: options.name,
        fontPath: options.fontPath, // set path to font (from your CSS file if relative)
        className: options.name // set class name in your CSS
      };
      gulp.src(options.cssSrc)
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:options.name }))
        .pipe(gulp.dest(options.cssDest));

    })
    .pipe(gulp.dest(options.dest)); // set path to export your fonts

};
