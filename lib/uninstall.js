var del = require('del');

module.exports = function(opts) {

  return del(opts.files);

};
