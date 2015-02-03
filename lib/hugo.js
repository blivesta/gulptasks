var cp = require('child_process');

module.exports = function(done) {
  return cp.spawn('hugo', ['-s', 'docs'], {stdio: 'inherit'})
    .on('close', done);
};
