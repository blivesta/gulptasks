var browsersync = require('browser-sync');
var reload      = browsersync.reload;
var gulp        = require('gulp');
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
    server: "./build/ruby-sass",
    // proxy: "yourlocal.dev",
    // notify: true,
    // https: false
  },
  uninstall: {
    files: [
      // './build'
    ]
  },
  scsslint: {
    src: './src/ruby-sass/**/*.{sass,scss}',
    options: {
      bundleExec: false
    }
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
    options: {
      // noCache: false,
      // bundleExec: false,
      sourcemap: true
    },
    filter:'**/*.css',
    autoprefixer: autoprefixerBrowsers,
    notify :"Compiled RubySass"
  },
  less: {
    src: './src/less/test-less.less',
    dest: './build/less/',
    options:{},
    filter:'**/*.css',
    autoprefixer: autoprefixerBrowsers,
    notify :"Compiled Less"
  },
  banner: {
    src:  './build/ruby-sass/test-ruby-sass.css',
    dest:  './build/banner',
    pkg: pkg,
    banner:headerBanner
  },
  csslint: {
    setting: './.csslintrc',
    src:  './build/**/*.css',
  },
  cssmin: {
    src:  './build/**/*.css',
    dest: './build/css/'
  },
  useref: {
    src:  './src/useref/index.html',
    dest: './build/useref/'
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
    strategy: 'mobile'
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
  },
  sftpProduction :{
    src:'production',
    options: {
      host: 'example.com',
      port: '22',
      user: 'user_name',
      pass: '1234',
      remotePath: ''
    }
  },
  sftpStaging :{
    src:  'staging',
    options: {
      host: 'beta.example.com',
      port: '22',
      user: 'user_name',
      pass: '1234',
      remotePath: ''
    }
  }
};

// gulp.task('bower', require('../lib/bower'));


// gulp.task('rubysass', require('../lib/rubysass'));

// gulp.task('scsslint', require('../lib/scsslint'));
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
gulp.task('bump', require('../lib/bump'));
// gulp.task('banner', require('../lib/banner'));
// gulp.task('useref', require('../lib/useref'));
//
// gulp.task('sftpProduction', require('../lib/sftpProduction'));
// gulp.task('sftpStaging', require('../lib/sftpStaging'));

// gulp.task('iconfont', require('../lib/iconfont'));
// gulp.task('uninstall', require('../lib/uninstall'));
// gulp.task('pagespeed', require('../lib/pagespeed'));
// gulp.task('browsersync', require('../lib/browsersync'));

// gulp.task('server', function(){browsersync(module.exports.browsersync);});

gulp.task('default',['browsersync'], function(){
  // gulp.watch(['./src/scss/**/*.scss'], ['sass','csslint', reload]);
  // gulp.watch(['./src/less/**/*.less'], ['less']);
  // gulp.watch("./build/less/*.html").on('change', reload);
  // gulp.watch(['./src/ruby-sass/**/*.scss'], ['rubysass']);
  // gulp.watch("./build/ruby-sass/*.html").on('change', reload);
  // gulp.watch(['./src/js/**/*.js'], ['jshint','jsmin', reload]);
  // gulp.watch(['./jekyll/**/*.html'], ['jekyll-build', reload]);
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
