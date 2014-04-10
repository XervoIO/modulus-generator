var gen = require('../');

require('chai').should();

describe('initialization', function () {

  it('should return an error for invalid template specifiers', function () {
    gen('test', 'test', function (err) {
      err.should.exist;
      err.message.should.equal('Incorrectly formatted template specifier.');
    });
  });

});
