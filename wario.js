;(function(){
  function parseEach(string, obj) {
    var matches = string.match(/(({{#each(.*?)}})(.*?){{\/each}})/g);
    var newText, i = 0, l = matches.length;
    for (newText = [], i; i < l; i++) {
      matchVal = obj[matches[i].match(/{{#each (.*?)}}/)[1]];
      for (var j = 0; j < matchVal.length; j++) {
        newText.push(replaceValues(matches[i].replace(/({{#each (.+?)}})|{{\/each}}/g, '').trim(), matchVal[j]));
      }
      string = string.replace(matches[i], newText.join(''));
    }
    return string;
  }

  function replaceValues(string, obj) {
    var matches = string.match(/{{([^}]*)}}/g);
    if(!matches) { return string; }
    var matchVal, i = 0, l = matches.length;
    for (i; i < l; i++) {
      matchVal = obj[matches[i].replace(/({{|}})/g, '')];
      string = string.replace(matches[i], matchVal);
    }
    return string;
  }

  function parseTemplate(template, obj) {
    template = template.replace(/(\r\n|\n|\r)/gm,'').trim();
    if ( template.indexOf('{{#each') > -1 ) {
      template = parseEach(template, obj);
    }
    return replaceValues(template, obj);
  }

  window.wario = parseTemplate;

}());
