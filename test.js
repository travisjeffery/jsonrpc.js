'use strict';

var koa = require('koa');
var bodyparser = require('koa-bodyparser');
var assert = require('assert');
var request = require('superagent');

var Client = require('.');
var client = new Client('http://localhost:3000/rpc');

var app = koa();
app.use(bodyparser());
app.use(function*() {
  this.body = { result: this.request.body };
});

describe('jsonrpc', function() {
  before(function(done){
    app.listen(3000, done);
  });

  it('should work', function(){
    return client.call('method', '1st param', '2nd param')
      .then(function(res) {
        assert(res.method == 'method');
        assert(res.params[0] == '1st param');
        assert(res.params[1] == '2nd param');
      });
  });
});
