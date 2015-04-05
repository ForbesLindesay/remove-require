'use strict';

var acorn = require('acorn');
var walk = require('acorn/dist/walk');

module.exports = replace;
function replace(src) {
  var ast = acorn.parse(src, {
    ecmaVersion: 6,
    allowReturnOutsideFunction: true
  });
  var locations = [];
  var tokens = {};
  function onIdentifier(node) {
    tokens[node.name] = true;
    if (node.name === 'require') {
      locations.push(node.start);
    }
  }
  function doWalk(ast) {
    walk.simple(ast, {
      Identifier: onIdentifier,
      VariableDeclaration: function (node) {
        node.declarations.map(function (node) {
          onIdentifier(node.id);
          if (node.init) doWalk(node.init);
        });
      },
      Function: function (node) {
        if (node.id) onIdentifier(node.id);
        node.params.forEach(function (node) {
          if (node.type === 'Identifier') {
            return onIdentifier(node);
          } else if (node.type === 'RestElement') {
            return onIdentifier(node.argument);
          // istanbul ignore else
          } else if (node.type === 'AssignmentPattern') {
            doWalk(node.right);
            return onIdentifier(node.left);
          } else {
            throw new Error('Unsupported argument type ' + node.type);
          }
        });
      }
    });
  }
  doWalk(ast);
  var requireName = '_dereq_';
  var i = 0;
  while (requireName in tokens) {
    var iStr = '' + i;
    while (iStr.length < 4) {
      iStr = '0' + iStr;
    }
    requireName = 'req' + iStr;
    i++;
  }
  // istanbul ignore if
  if (requireName.length !== 7) {
    throw new Error('Cannot remove require from file because it contains _dereq_.');
  }
  locations.forEach(function (start) {
    src = src.substr(0, start) + requireName + src.substr(start + 7);
  });
  return {name: requireName, src: src};
}
