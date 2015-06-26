var browsersync = require('browser-sync');
var reload      = browsersync.reload;
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var pngquant    = require('imagemin-pngquant');
var pkg         = require( process.cwd() + '/package.json');

var autoprefixerBrowsers = ['> 1%', 'last 2 versions'];

var headerBanner = [
'/*!',
' * <%= pkg.name %> - <%= pkg.description %>',
' * @version v<%= pkg.version %>',
' * @link    <%= pkg.homepage %>',
' * @author  <%= pkg.author %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');


gulp.task('browserify', function(){
  return require(process.cwd() + '/lib/browserify')({
    bundleName:  "bundle.js",
    src:  './sandbox/src/browserify/main.js',
    dest: './sandbox/build/browserify',
  });
});

gulp.task('sass', function(){
  return require(process.cwd() + '/lib/sass')({
    src: './sandbox/src/scss/sass.scss',
    dest: './sandbox/build/sass/',
    rubySass: {
      sourcemap: true,
      noCache: true,
    },
    fallback:{
      autoprefixer: ['> 1%', 'last 2 versions'],
      opacity:true,
      rgba:true,
      pixrem:true
    },
    banner: {
      content: headerBanner,
      pkg: pkg
    }
  });
});

gulp.task('cssmin', function(){
  return require(process.cwd() + '/lib/cssmin')({
    src:  './sandbox/build/**/*.css',
    dest: './sandbox/build/cssmin/'
  });
});

gulp.task('csslint', function(){
  return require(process.cwd() + '/lib/csslint')({
    // csslint: './.csslintrc',
    src:  './sandbox/build/**/*.css',
  });
});

gulp.task('concat', function(){
  return require(process.cwd() + '/lib/concat')({
    src:  './sandbox/src/js/*.js',
    dest: './sandbox/build/js',
    name: 'concat.js'
  });
});

gulp.task('jsmin', function(){
  return require(process.cwd() + '/lib/jsmin')({
    src:  './sandbox/src/js/concat.js',
    dest: './sandbox/build/js/'
  });
});

gulp.task('jshint', function(){
  return require(process.cwd() + '/lib/jshint')({
    // jshintPath: './.jshintrc',
    src:  './sandbox/build/js/concat.js'
  });
});

gulp.task('image', function(){
  return require(process.cwd() + '/lib/image')({
    src:  './sandbox/src/images/**/*',
    dest: './sandbox/build/images',
    options:{
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }
  });
});

gulp.task('svg2png', function(){
  return require(process.cwd() + '/lib/svg2png')({
    src:  './sandbox/src/images/**/*.svg',
    dest: './sandbox/src/images'
  });
});


gulp.task('iconfont', function(){
  return require(process.cwd() + '/lib/iconfont')({
    name:     'icon',
    svgSrc:   './sandbox/src/icon/svg/*.svg',
    cssSrc:   './sandbox/src/icon/css/template.css',
    cssDest:  './sandbox/build/icon/css',
    fontPath: '../font/',
    dest:     './sandbox/build/icon/font'
  });
});


gulp.task('sftp', function(){
  return require(process.cwd() + '/lib/sftp')({
    src:'production',
    options: {
      host: 'example.com',
      port: '22',
      user: 'user_name',
      pass: '1234',
      remotePath: ''
    }
  });
});


gulp.task('banner', function(){
  return require(process.cwd() + '/lib/banner')({
    src:  './sandbox/build/js/concat.js',
    dest:  './sandbox/build/js/banner',
    pkg: pkg,
    banner:headerBanner
  });
});


gulp.task('uninstall', function(){
  return require(process.cwd() + '/lib/uninstall')({
    files:[
      "./sandbox/build"
    ]
  });
});


gulp.task('browsersync', function(){
  browsersync({
    server: "./sandbox",
  });
});

gulp.task('default',['browsersync'], function(){
  gulp.watch(['./sandbox/src/scss/*.scss'], ['rubysass']);
  gulp.watch(['./sandbox/src/browserify/*.js'], ['browserify']);
  gulp.watch("./sandbox/build/*/*.{css,js}").on('change', reload);
});

gulp.task('build', function(){
  runSequence(
    'uninstall',
    'browserify',
    'rubysass',
    'concat',
    ['cssmin','jsmin','svg2png'],
    'image',
    'banner',
    'jshint',
    // 'csslint',
    'iconfont'
  );
});
