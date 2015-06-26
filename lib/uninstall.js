var del = require('del');

module.exports = function(options) {

  return del(options.files);

};
