import Browsersync,{reload} from 'browser-sync'
import gulp from 'gulp'
import runSequence from 'run-sequence'
import pkg from '../package.json'
// gulptasks
import Browserify from '../lib/js-browserify.js'
import Banner from '../lib/banner.js'
import Del from '../lib/del.js'
import CssMin from '../lib/css-min.js'
import Concat from '../lib/concat.js'
import Svgpack from '../lib/svgpack.js'
import JsMin from '../lib/js-min.js'
import Jshint from '../lib/jshint.js'
import Image from '../lib/image.js'
import Sass from '../lib/sass.js'
import Sftp from '../lib/sftp.js'
import Svg2png from '../lib/svg2png.js'

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
  return CssMin({
    src: './build/**/*.css',
    dest: './build/cssmin/'
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
  return JsMin({
    src: './build/browserify/bundle.js',
    dest: './build/js/'
  });
});


gulp.task('jshint', () => {
  return Jshint({
    src: './build/js/concat.js'
  });
});


gulp.task('image', () => {
  return Image({
    src: './src/images/**/*',
    dest: './build/images',
    options: {
      // gulp-image options
      // https://github.com/1000ch/gulp-image#usage
      pngquant: true,
      optipng: false,
      zopflipng: true,
      advpng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true
    }
  });
});


gulp.task('svg2png', () => {
  return Svg2png({
    src: './src/images/**/*.svg',
    dest: './build/images'
  });
});


gulp.task('svg-tool', () => {
  return Svgpack({
    src:'./src/images/*.svg',
    // flexicon-generator options
    // https://github.com/blivesta/svgpack#options
    name: 'gulptasks',
    prefix: 'gt',
    dist:'./~svgpack'
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
    src: './build/browserify/bundle.js',
    dest: './build/js/banner',
    pkg: pkg,
    banner: headerBanner
  });
});


gulp.task('clenup', () => {
  return Del({
    files: [
      './build/',
      './svg-tool'
    ]
  });
});


gulp.task('browsersync', () => {
  Browsersync({
    server: './'
  });
});


gulp.task('default', ['browsersync'], () => {
  gulp.watch(['./src/scss/*.scss'], ['sass']);
  gulp.watch(['./src/browserify/*.js'], ['js']);
  gulp.watch('./build/*/*.{css,js}').on('change', reload);
});


gulp.task('build', ['clenup','svg-tool'], () => {
  runSequence(
    'js',
    'sass',
    'concat',
    [
      'cssmin',
      'jsmin',
      'svg2png'
    ],
    'image',
    'banner',
    'jshint'
  );
});
