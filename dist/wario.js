(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.wario = factory();
})(this, function () {
  'use strict';

  var rps = {
    core: {
      replace: /(\r\n|\n|\r)/gm
    },
    each: {
      matchChunk: /(({{#each(.*?)}})(.*?){{\/each}})/g,
      matchAttribute: /{{#each (.*?)}}/,
      replace: /({{#each (.+?)}})|{{\/each}}/g
    },
    rpv: {
      match: /{{([^}]*)}}/g,
      replace: /({{|}})/g
    }
  };

  function getNested(_x, _x2) {
    var _again = true;

    _function: while (_again) {
      var obj = _x,
          key = _x2;
      _again = false;

      var parts = key.split('.');
      var realKey = parts[0];
      var attribute = obj[realKey];
      if (parts.length > 1) {
        _x = attribute;
        _x2 = parts.slice(1).join('.');
        _again = true;
        parts = realKey = attribute = undefined;
        continue _function;
      } else {
        return attribute;
      }
    }
  }

  function parseEach(string, obj) {
    var pattern = rps.each.matchChunk;
    var parsed = string.match(pattern).reduce(function (result, m) {
      var key = m.match(rps.each.matchAttribute)[1];
      var matchVal = getNested(obj, key);
      var newText = matchVal.map(function (value) {
        return replaceValues(m.replace(rps.each.replace, ''), value);
      });

      return result.replace(m, newText.join(''));
    }, string);

    return parsed;
  }

  function replaceValues(string, obj) {
    var matches = string.match(rps.rpv.match);
    if (!matches) {
      return string;
    }
    var parsed = matches.reduce(function (result, m) {
      var key = m.replace(rps.rpv.replace, '');
      var matchVal = getNested(obj, key);
      return result.replace(m, matchVal);
    }, string);

    return parsed;
  }

  function parseTemplate(template, obj) {
    var source = template.replace(rps.core.replace, '').trim();
    if (template.indexOf('{{#each') > -1) {
      return replaceValues(parseEach(source, obj), obj);
    }
    return replaceValues(source, obj);
  }

  return parseTemplate;
});
//# sourceMappingURL=wario.js.map
