const rps = {
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

export default rps;
