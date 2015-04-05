var x = require('foo');
var y = require('bar');
function foo(require = 'foo') {
  return require('blah');
}
foo(function () {
  return 'blah';
});