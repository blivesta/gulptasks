var browsersync = require('browser-sync');
var reload      = browsersync.reload;
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var pngquant    = require('imagemin-pngquant');
var pkg         = require('../package.json');

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
  return require('../lib/browserify')({
    bundleName:  "bundle.js",
    src:  './src/browserify/main.js',
    dest: './build/browserify',
  });
});

gulp.task('sass', function(){
  return require('../lib/sass')({
    src: './src/scss/sass.scss',
    dest: './build/sass/',
    rubySass: {
      sourcemap: true,
      noCache: true,
    },
    postcss: {
      autoprefixer: ['> 1%', 'last 2 versions'],
      opacity:false,
      rgba:true,
      pixrem:true,
      mqpacker:true
    },
    banner: {
      content: headerBanner,
      pkg: pkg
    }
  });
});

gulp.task('cssmin', function(){
  return require('../lib/cssmin')({
    src:  './build/**/*.css',
    dest: './build/cssmin/'
  });
});

gulp.task('csslint', function(){
  return require('../lib/csslint')({
    // csslint: './.csslintrc',
    src:  './build/**/*.css',
  });
});

gulp.task('concat', function(){
  return require('../lib/concat')({
    src:  './src/js/*.js',
    dest: './build/js',
    name: 'concat.js'
  });
});

gulp.task('jsmin', function(){
  return require('../lib/jsmin')({
    src:  './src/js/concat.js',
    dest: './build/js/'
  });
});

gulp.task('jshint', function(){
  return require('../lib/jshint')({
    // jshintPath: './.jshintrc',
    src:  './build/js/concat.js'
  });
});

gulp.task('image', function(){
  return require('../lib/image')({
    src:  './src/images/**/*',
    dest: './build/images',
    options:{
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }
  });
});

gulp.task('svg2png', function(){
  return require('../lib/svg2png')({
    src:  './src/images/**/*.svg',
    dest: './src/images'
  });
});


gulp.task('iconfont', function(){
  return require('../lib/iconfont')({
    name:     'icon',
    svgSrc:   './src/icon/svg/*.svg',
    cssSrc:   './src/icon/css/template.css',
    cssDest:  './build/icon/css',
    fontPath: '../font/',
    dest:     './build/icon/font'
  });
});


gulp.task('sftp', function(){
  return require('../lib/sftp')({
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
  return require('../lib/banner')({
    src:  './build/js/concat.js',
    dest:  './build/js/banner',
    pkg: pkg,
    banner:headerBanner
  });
});


gulp.task('uninstall', function(){
  return require('../lib/uninstall')({
    files:[
      "./build"
    ]
  });
});


gulp.task('browsersync', function(){
  browsersync({
    server: "./",
  });
});

gulp.task('default',['browsersync'], function(){
  gulp.watch(['./src/scss/*.scss'], ['rubysass']);
  gulp.watch(['./src/browserify/*.js'], ['browserify']);
  gulp.watch("./build/*/*.{css,js}").on('change', reload);
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
