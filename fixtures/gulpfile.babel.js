import Browsersync,{reload} from 'browser-sync'
import gulp from 'gulp'
import runSequence from 'run-sequence'
import pngquant from 'imagemin-pngquant'
import pkg from '../package.json'
// gulptasks
import Browserify from '../lib/js-browserify.js'
import Sass from '../lib/sass.js'
import Cssmin from '../lib/cssmin.js'
import Csslint from '../lib/csslint.js'
import Concat from '../lib/concat.js'
import Jsmin from '../lib/jsmin.js'
import Jshint from '../lib/jshint.js'
import Image from '../lib/image.js'
import Svg2png from '../lib/svg2png.js'
import Iconfont from '../lib/iconfont.js'
import Sftp from '../lib/sftp.js'
import Banner from '../lib/banner.js'
import Uninstall from '../lib/uninstall.js'

const autoprefixerBrowsers = [
  '> 1%',
  'last 2 versions'
]
const headerBanner = [
  '/*!',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link    <%= pkg.homepage %>',
  ' * @author  <%= pkg.author %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

gulp.task('js', () => {
  return Browserify({
    bundleName: 'bundle.js',
    src: './src/browserify/main.js',
    dest: './build/browserify'
  });
});

gulp.task('sass', () => {
  return Sass({
    src: './src/scss/sass.scss',
    dest: './build/sass/',
    rubySass: {
      sourcemap: true,
      noCache: true
    },
    postcss: {
      autoprefixer: [
        '> 1%',
        'last 2 versions'
      ],
      opacity: false,
      rgba: true,
      pixrem: true,
      mqpacker: true
    },
    banner: {
      content: headerBanner,
      pkg: pkg
    }
  });
});


gulp.task('cssmin', () => {
  return Cssmin({
    src: './build/**/*.css',
    dest: './build/cssmin/'
  });
});


gulp.task('csslint', () => {
  return Csslint({
    // csslint: './.csslintrc',
    src: './build/**/*.css'
  });
});


gulp.task('concat', () => {
  return Concat({
    src: './src/js/*.js',
    dest: './build/js',
    name: 'concat.js'
  });
});


gulp.task('jsmin', () => {
  return Jsmin({
    src: './src/js/concat.js',
    dest: './build/js/'
  });
});


gulp.task('jshint', () => {
  return Jshint({
    // jshintPath: './.jshintrc',
    src: './build/js/concat.js'
  });
});


gulp.task('image', () => {
  return Image({
    src: './src/images/**/*',
    dest: './build/images',
    options: {
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }
  });
});


gulp.task('svg2png', () => {
  return Svg2png({
    src: './src/images/**/*.svg',
    dest: './src/images'
  });
});


gulp.task('iconfont', () => {
  return Iconfont({
    name: 'icon',
    svgSrc: './src/icon/svg/*.svg',
    cssSrc: './src/icon/css/template.css',
    cssDest: './build/icon/css',
    fontPath: '../font/',
    dest: './build/icon/font'
  });
});


gulp.task('sftp', () => {
  return Sftp({
    src: 'production',
    options: {
      host: 'example.com',
      port: '22',
      user: 'user_name',
      pass: '1234',
      remotePath: ''
    }
  });
});


gulp.task('banner', () => {
  return Banner({
    src: './build/js/concat.js',
    dest: './build/js/banner',
    pkg: pkg,
    banner: headerBanner
  });
});


gulp.task('uninstall', () => {
  return Uninstall({
    files: ['./build']
  });
});


gulp.task('browsersync', () => {
  Browsersync({
    server: './'
  });
});


gulp.task('default', ['browsersync'], () => {
  gulp.watch(['./src/scss/*.scss'], ['rubysass']);
  gulp.watch(['./src/browserify/*.js'], ['js']);
  gulp.watch('./build/*/*.{css,js}').on('change', reload);
});


gulp.task('build', () => {
  runSequence(
    'uninstall',
    'js',
    'rubysass',
    'concat',
    [
      'cssmin',
      'jsmin',
      'svg2png'
    ],
    'image',
    'banner',
    'jshint',
    // 'csslint',
    'iconfont');
});
