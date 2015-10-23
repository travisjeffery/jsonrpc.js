'use strict';

var request = require('superagent');
var uid = require('uid2');

/**
 * Exports.
 */

module.exports = Client;

/**
 * Client.
 */

function Client(addr) {
  this.addr = addr;
}

/**
 * Call RPC `method` with `params`.
 *
 * @param {String} method
 * @param {Mix} params...
 * @return {Promise}
 */

Client.prototype.call = function(method) {
  var self = this;
  var params = Array.prototype.slice.call(arguments, 1);
  var req = {
    method: method,
    params: params,
    id: uid(16)
  };
  return new Promise(function(resolve, reject) {
    request
      .post(self.addr)
      .send(req)
      .end(function(err, res) {
        var body = res.body;
        err = err || body.error && new Error(body.error);
        if (err) return reject(err);
        resolve(body.result);
      });
  });
}
