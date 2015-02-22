var browsersync  = require('browser-sync');
var config       = require('../../../gulpfile').browsersync;
// var config       = require('../test/gulpfile').browsersync; //test

module.exports = function() {
 browsersync(config);
};