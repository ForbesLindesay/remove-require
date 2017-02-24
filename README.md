# remove-require

[![Greenkeeper badge](https://badges.greenkeeper.io/ForbesLindesay/remove-require.svg)](https://greenkeeper.io/)

Remove requires and replace them with something else of the same length.

It is clever enough to detect if `_dereq_` is already taken, and always choose a token that is unused.  It also changes any parameter names, variable declarations etc. to match.  It will change the variable even if it appears to be global, this saves it from having to do scope analysis.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/remove-require/master.svg)](https://travis-ci.org/ForbesLindesay/remove-require)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/remove-require.svg)](https://david-dm.org/ForbesLindesay/remove-require)
[![NPM version](https://img.shields.io/npm/v/remove-require.svg)](https://www.npmjs.org/package/remove-require)

## Installation

    npm install remove-require

## Usage

```js
var removeRequire = require('remove-require');

var result = removeRequire('var x = require("foo");');
// => {src: 'var x = _dereq_("foo");', name: '_dereq_'}
```

## License

  MIT
