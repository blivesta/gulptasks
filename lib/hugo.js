var cp = require('child_process');
var config      = require('../../../gulpfile').hugo;
// var config      = require('../test/gulpfile').hugo; //test

module.exports = function(done) {
  return cp.spawn('hugo', ['-s', config.src], {stdio: 'inherit'})
    .on('close', done);
};
