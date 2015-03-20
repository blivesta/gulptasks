# Gulptasks

[![npm version](https://img.shields.io/npm/v/gulptasks.svg?style=flat)](https://www.npmjs.com/package/gulptasks)
[![Build Status](https://img.shields.io/travis/blivesta/gulptasks/master.svg?style=flat)](https://travis-ci.org/blivesta/gulptasks)
[![Dependency Status](https://david-dm.org/blivesta/gulptasks.svg)](https://david-dm.org/blivesta/gulptasks)

## Install

```shell
$ npm install gulptasks
```

## Example

1. [gulpfile.js](https://github.com/blivesta/gulptasks/blob/master/test/gulpfile.js)
2. [sircus / gulpfile.js](https://github.com/sircus/sircus/blob/master/gulpfile.js)
3. [drawer / gulpfile.js](https://github.com/blivesta/drawer/blob/master/gulpfile.js)


## Gulptasks

> $ gulp banner

require: `gulp-header` `gulp-size`

> $ gulp bower

require: `gulp-bower`

> $ gulp browserify

require: `browserify` `gulp-if` `gulp-sourcemaps` `gulp-size` `gulp-uglify` `vinyl-transform`

> $ gulp browsersync

require: `browsersync`

> $ gulp bump

require: `gulp-bump`

> $ gulp concat

require: `gulp-concat`

> $ gulp csslint

require: `gulp-csslint`

> $ gulp cssmin

require: `gulp-csso` `gulp-rename` require: `gulp-size` `gulp-gzip`

> $ gulp ghpage

require: `gulp-gh-pages`


> $ gulp hugo

require: `child_process`


> $ gulp iconfont

require: `gulp-iconfont` `gulp-rename` `gulp-consolidate`


> $ gulp imgmin

require: `gulp-image` `gulp-newer`

> $ gulp jekyll

require: `child_process`

> $ gulp jshint

require: `gulp-jshint`


> $ gulp jsmin

require: `gulp-uglify` `gulp-rename` `gulp-gzip` `gulp-size`


> $ gulp less

require: `gulp-less` `gulp-filter` `gulp-sourcemaps` `gulp-autoprefixer` `gulp-size` `browser-sync`　


> $ gulp pagespeed

require: `psi`


> $ gulp rubysassBasic

require: `gulp-ruby-sass` `gulp-filter` `gulp-sourcemaps` `gulp-autoprefixer` `gulp-size`　`browser-sync`


> $ gulp rubysass

require: `gulp-ruby-sass` `gulp-postcss` `gulp-filter` `gulp-sourcemaps` `autoprefixer` `gulp-size` `gulp-header` `gulp-if` `pixrem` `postcss-color-hex` `postcss-opacity` `browser-sync`


> $ gulp cssslint

require: `gulp-scss-lint`


> $ gulp sftp-[production \ staging \ test ]

require: `gulp-sftp`


> $ gulp styledocco

require: `child_process`


> $ gulp stylestats

require: `gulp-stylestats`


> $ gulp svg2png

require: `gulp-svg2png`


> $ gulp uninstall

require: `del`


> $ gulp useref

require: `gulp-useref`



## License
Released under the [MIT](https://github.com/blivesta/gulptasks/blob/master/LICENSE) license.
