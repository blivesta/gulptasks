var cp = require('child_process');

module.exports = function(done) {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
};