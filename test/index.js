'use strict';

var assert = require('assert');
var fs = require('fs');
var test = require('testit');
var removeRequire = require('../');

try {
  fs.mkdirSync(__dirname + '/output');
} catch (ex) {
  if (ex.code !== 'EEXIST') throw ex;
}
fs.readdirSync(__dirname + '/cases').forEach(function (testCase) {
  if (!/\.input\.js$/.test(testCase)) {
    return;
  } else {
    testCase = testCase.replace(/\.input\.js$/, '');
  }
  test(testCase, function () {
    var input = fs.readFileSync(__dirname + '/cases/' + testCase + '.input.js', 'utf8');
    var expected = fs.readFileSync(__dirname + '/cases/' + testCase + '.expected.js', 'utf8');
    var output = removeRequire(input);
    fs.writeFileSync(__dirname + '/output/' + testCase + '.js', output.src);
    assert.equal(output.src, expected);
  });
});