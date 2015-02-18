var del         = require('del');
var config      = require('../../../gulpfile').uninstall;
// var config   = require('../test/gulpfile').uninstall; //test

module.exports = function() {
  return del.bind(null, config.files);
};