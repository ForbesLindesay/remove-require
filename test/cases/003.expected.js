var x = _dereq_('foo');
var y = _dereq_('bar');
function foo(_dereq_ = 'foo') {
  return _dereq_('blah');
}
foo(function () {
  return 'blah';
});