var browsersync = require('browser-sync');
var reload      = browsersync.reload;
var del         = require('del');
var gulp        = require('gulp');
var pagespeed   = require('psi');
var runSequence = require('run-sequence');
var pkg         = require('../package.json');

var autoprefixerBrowsers = ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'];

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
      './build',
      './build'
    ]
  },
  sass: {
    src: './src/sass/test-sass.scss',
    dest: './build/sass/',
    autoprefixer: autoprefixerBrowsers,
    pkg: pkg,
    headerBanner : true,
    banner:headerBanner,
    staticGenerator:true,
    staticGeneratorBuild:'./pub'
  },
  rubysass: {
    src: './src/ruby-sass/test-ruby-sass.scss',
    dest: './build/ruby-sass/',
    autoprefixer: autoprefixerBrowsers,
    pkg: pkg,
    headerBanner : true,
    banner:headerBanner,
    staticGenerator:true,
    staticGeneratorBuild:'./pub'
  },
  less: {
    src: './src/less/test-less.less',
    dest: './build/less/',
    autoprefixer: autoprefixerBrowsers,
    pkg: pkg,
    headerBanner : true,
    banner:headerBanner,
    staticGenerator:true,
    staticGeneratorBuild:'./pub'
  },
  header: {
    src:  './build/sass/test-sass.css',
    dest:  './build/banner',
  },
  csslint: {
    setting: './.csslintrc',
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
    setting: './.jshintrc',
    src:  './src/js/*.js'
  },
  imgmin: {
    src:  './src/images/**/*',
    dest: './build/images'
  },
  svg2png: {
    src:  './src/images/**/*.svg',
    dest: './src/images'
  },
  jekyll: {
    buildMessages : '<span style="color: grey">Running:</span> $ jekyll build'
  },
  hugo: {
    src:"hugo"
  },
  ghpage : {
    src : "./pub/**/*",
    remoteUrl : "git@github.com:user/repo.git",
    branch : "gh-pages"
  },
  pagespeed: {
    production: 'http://example.com',
    // develop : 'http://dev.example.com'
  },
  bump: {
    version: pkg.version, // base
    src:  './bower.json', //
    dest: '.'
  },
  iconfont: {
    name:     'icon',
    svgSrc:   './src/icon/svg/*.svg',
    cssSrc:   './src/icon/css/template.css',
    cssDest:  './build/icon/css',
    fontPath: './build/icon/font/',
    dest:     './build/icon/font'
  }
};

gulp.task('bower', require('../lib/bower'));

// gulp.task('header', require('../lib/header'));

gulp.task('rubysass', require('../lib/rubysass'));

// gulp.task('sass', require('../lib/sass'));

// gulp.task('less', require('../lib/less'));

// gulp.task('csslint', require('../lib/csslint'));

// gulp.task('cssmin', require('../lib/cssmin'));

// gulp.task('concat', require('../lib/concat'));

// gulp.task('jshint', require('../lib/jshint'));

// gulp.task('jsmin', require('../lib/jsmin'));

// gulp.task('imgmin', require('../lib/imgmin'));

// gulp.task('svg2png', require('../lib/svg2png'));

// gulp.task('jekyll-build', require('../lib/jekyll'));

// gulp.task('hugo', require('../lib/hugo'));

// gulp.task('deploy-ghpage', require('../lib/ghpage'));

// gulp.task('bump', require('../lib/bump'));

// gulp.task('iconfont', require('../lib/iconfont'));

// uninstall
gulp.task('uni', del.bind(null, module.exports.uninstall.files));

gulp.task('server', function(){ browsersync.init(null, module.exports.browsersync); });

gulp.task('pagespeed', function (cb) {
  pagespeed.output(module.exports.pagespeed.production, {
    strategy: 'mobile'
  }, cb);
});

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
