var gulp        = require('gulp');
var iconfont    = require('gulp-iconfont');
var rename      = require("gulp-rename");
var consolidate = require('gulp-consolidate');
// css template
// https://github.com/cognitom/symbols-for-sketch/blob/master/templates/fontawesome-style.css

module.exports = function(opts) {

  return gulp.src(opts.svgSrc)
    .pipe(iconfont({ fontName: opts.name }))
    .on('codepoints', function(codepoints) {
      var options = {
        glyphs: codepoints,
        fontName: opts.name,
        fontPath: opts.fontPath, // set path to font (from your CSS file if relative)
        className: opts.name // set class name in your CSS
      };
      gulp.src(opts.cssSrc)
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:opts.name }))
        .pipe(gulp.dest(opts.cssDest));

    })
    .pipe(gulp.dest(opts.dest)); // set path to export your fonts

};
