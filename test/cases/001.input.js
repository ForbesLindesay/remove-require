var x = require('foo');
var y = require('bar');
function foo(require) {
  return require('blah');
}
foo(function () {
  return 'blah';
});