#Gulptasks

[![npm version](https://img.shields.io/npm/v/gulptasks.svg?style=flat)](https://www.npmjs.com/package/gulptasks)
[![Build Status](https://img.shields.io/travis/blivesta/gulptasks/master.svg?style=flat)](https://travis-ci.org/blivesta/gulptasks)
[![Dependency Status](https://david-dm.org/blivesta/gulptasks.svg)](https://david-dm.org/blivesta/gulptasks)


## Feature

* bower
* concat
* csslint
* cssmin
* ghpage
* imgmin
* jekyll
* jshint
* jsmin
* less
* sass

## Install

```bash
$ npm install gulptasks
```

## Example
gulpfile.js

```js
var browsersync = require('browser-sync');
var reload      = browsersync.reload;
var del         = require('del');
var gulp        = require('gulp');
var pagespeed   = require('psi');
var runSequence = require('run-sequence');

var autoprefixerBrowsers = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];

var headerBanner = [
'/*!',
' * <%= pkg.name %> - <%= pkg.description %>',
' * @version v<%= pkg.version %>',
' * @link    <%= pkg.homepage %>',
' * @author  <%= pkg.author %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');

module.exports = {
  browsersync: {
    notify: true,
    https: false,
    server: './pub'
  },
  uninstall: {
    files: [
      './build'
    ]
  },
  sass: {
    src: './src/sass/test-sass.scss',
    dest: './build/scss/',
    autoprefixer: autoprefixerBrowsers,
    headerBanner : true,
    banner:headerBanner,
    jekyll : false,
    jekyllPub: './pub'
  },
  less: {
    src: './src/less/test-less.less',
    dest: './build/less/',
    autoprefixer: autoprefixerBrowsers,
    headerBanner : true,
    banner:headerBanner,
    jekyll : false,
    jekyllPub: './pub'
  },
  csslint: {
    src:  './build/**/*.css',
  },
  cssmin: {
    src:  './build/**/*.css',
    dest: './build/css/'
  },
  concat: {
    src:  './src/js/*.js',
    dest: './build/js',
    name: 'gulptasks.js'
  },
  jsmin: {
    src:  './src/js/test.js',
    dest: './build/js/'
  },
  jshint: {
    src:  './src/js/*.js',
  },
  imgmin: {
    src:  './src/images/**/*',
    dest: './build/images'
  },
  jekyll: {
    buildMessages : '<span style="color: grey">Running:</span> $ jekyll build'
  },
  ghpage : {
    src : "./pub/**/*",
    remoteUrl : "git@github.com:user/repo.git",
    branch : "gh-pages"
  },
  pagespeed: {
    production: 'http://example.com',
    // develop : 'http://dev.example.com'
  }
};

gulp.task('bower', require('../lib/bower'));

gulp.task('sass', require('../lib/sass'));

gulp.task('less', require('../lib/less'));

gulp.task('csslint', require('../lib/csslint'));

gulp.task('cssmin', require('../lib/cssmin'));

gulp.task('concat', require('../lib/concat'));

gulp.task('jshint', require('../lib/jshint'));

gulp.task('jsmin', require('../lib/jsmin'));

gulp.task('imgmin', require('../lib/imgmin'));

gulp.task('jekyll-build', require('../lib/jekyll'));

gulp.task('deploy-ghpage', require('../lib/ghpage'));

//

gulp.task('uninstall', del.bind(null, module.exports.uninstall.files));

gulp.task('server', function(){ browsersync.init(null, module.exports.browsersync); });

gulp.task('pagespeed', pagespeed.bind(null, {
  url: module.exports.pagespeed.production,
  strategy: 'mobile'
}));

gulp.task('default',['server'], function(){
  gulp.watch(['./src/less/**/*.less'], ['less','csslint', reload]);
  gulp.watch(['./src/scss/**/*.scss'], ['sass','csslint', reload]);
  gulp.watch(['./src/js/**/*.js'], ['jshint','jsmin', reload]);
  gulp.watch(['./jekyll/**/*.html'], ['jekyll-build', reload]);
});

gulp.task('build', function(){
  runSequence(
    'bower',
    'uninstall',
    ['sass','less'],
    'imgmin','concat','jshint','csslint',
    ['cssmin','jsmin','jekyll-build']
  );
});

```