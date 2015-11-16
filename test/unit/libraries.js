import wario from '../../src/wario';

describe('Wario', () => {
  describe('Object value replacement', () => {
    it('should insert the "name" attribute', () => {
      const object = {
        name: 'Wario'
      };
      const template = '{{name}} is the best!';
      expect(wario(template, object)).to.equal('Wario is the best!');
    });

    it('should be able to insert multiple values', () => {
      const object = {
        name: 'Wario',
        color: 'yellow'
      };
      const template = '{{name}} has a {{color}} hat.';
      expect(wario(template, object)).to.equal('Wario has a yellow hat.');
    });

    it('should be able to loop through an array of values using {{#each}}', () => {
      const object = {
        characters: [
          {name: 'Wario'},
          {name: 'Mario'},
          {name: 'Luigi'}
        ]
      };
      const template = '{{#each characters}}{{name}} {{/each}}';
      expect(wario(template, object)).to.equal('Wario Mario Luigi ');
    });

    it('should be able to insert nested values', () => {
      const object = {
        character: {
          name: 'Wario',
          color: {
            primary: 'yellow'
          }
        }
      };
      const template = '{{character.name}} has a {{character.color.primary}} hat.';
      expect(wario(template, object)).to.equal('Wario has a yellow hat.');
    });

    it('should be able to insert nested values, top level values, and loop through arrays', () => {
      const object = {
        character: {
          color: {
            primary: 'yellow'
          }
        },
        name: 'Wario',
        foods: [
          {name: 'bacon'},
          {name: 'lettuce'},
          {name: 'tomatoes'}
        ]
      };
      const template = '{{name}} has a {{character.color.primary}} hat. His favourite sandwich contains: {{#each foods}}{{name}} and {{/each}}no mayonnaise.';
      expect(wario(template, object)).to.equal('Wario has a yellow hat. His favourite sandwich contains: bacon and lettuce and tomatoes and no mayonnaise.');
    });

  });
});
