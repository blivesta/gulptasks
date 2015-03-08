var cp          = require('child_process');
var config      = require('../../../gulpfile').styledocco;
// var config      = require('../test/gulpfile').styledocco; //test

module.exports = function(done) {
  return cp.spawn(
    'styledocco',
    ['-n', config.name, config.src, '-o', config.dest],{
      stdio: 'inherit'
    })
    .on('close', done);
};
