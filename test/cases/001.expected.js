var x = _dereq_('foo');
var y = _dereq_('bar');
function foo(_dereq_) {
  return _dereq_('blah');
}
foo(function () {
  return 'blah';
});