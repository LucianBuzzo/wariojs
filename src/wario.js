import rps from './patterns';

function getNested(obj, key) {
  const parts = key.split('.');
  const realKey = parts[0];
  const attribute = obj[realKey];
  if (parts.length > 1) {
    return getNested(attribute, parts.slice(1).join('.'));
  } else {
    return attribute;
  }
}

function parseEach(string, obj) {
  const pattern = rps.each.matchChunk;
  const parsed = string.match(pattern).reduce((result, m) => {
    let key = m.match(rps.each.matchAttribute)[1];
    let matchVal = getNested(obj, key);
    let newText = matchVal.map((value) => {
      return replaceValues(m.replace(rps.each.replace, ''), value);
    });

    return result.replace(m, newText.join(''));
  }, string);

  return parsed;
}

function replaceValues(string, obj) {
  const matches = string.match(rps.rpv.match);
  if (!matches) { return string; }
  const parsed = matches.reduce((result, m) => {
    let key = m.replace(rps.rpv.replace, '');
    let matchVal = getNested(obj, key);
    return result.replace(m, matchVal);
  }, string);

  return parsed;
}

function parseTemplate(template, obj) {
  const source = template.replace(rps.core.replace,'').trim();
  if (template.indexOf('{{#each') > -1) {
    return replaceValues(parseEach(source, obj), obj);
  }
  return replaceValues(source, obj);
}

export default parseTemplate;
