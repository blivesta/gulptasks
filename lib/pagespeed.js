var pagespeed   = require('psi');
var config      = require('../../../gulpfile').pagespeed;
// var config   = require('../test/gulpfile').pagespeed; //test

module.exports = function() {
  return pagespeed.output(config.production, {
    strategy: config.strategy
  });
};


