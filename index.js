var generate = require('./lib/generate');
var request  = require('request');

//
// Grab the specified template and write it to the specified output directory.
//
module.exports = function (template, out, fn) {

  if (template.indexOf('/') < 0) {
    return fn(new Error('Incorrectly formatted template specifier.'));
  }

  generate(request, template, out, fn);
};
