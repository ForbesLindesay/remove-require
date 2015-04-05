var x = require('foo');
var y = require('bar');
function foo(...require) {
  return require[0]('blah');
}
foo(function () {
  return 'blah';
});