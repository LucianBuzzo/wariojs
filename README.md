#Wario js
A microscopic, moustache like templating library.

Wario exposes the `wario()` function that accepts a string and an object and
returns the compiled results. Attributes in templates should be wrapped in `{{` and `}}`.

You can see a demo here http://lucianbuzzo.github.io/wariojs/demo/

```
var obj = { color: 'blue' }
var template = 'The sky is {{color}}';
var output = wario(template, obj);
// → 'The sky is blue'
```

##Basics
View  
```
{ name: 'Lucian', food: { snack: 'biscuits' } }
```

Template  
```
<p>Hello my name is {{name}}! I like eating {{food.snack}}.</p>
```

Output  
```
<p>Hello my name is Lucian! I like eating biscuits.</p>
```

##Arrays
View  
```
var obj = {
  foods: [
    { foodName: 'Noodles', foodAttribute: 'stringy' },
    { foodName: 'Tacos', foodAttribute: 'crunchy' },
    { foodName: 'Ice cream sandwiches', foodAttribute: 'cold' }
  ]
};
```

Template  
```
<p>I like eating the following foods:</p>
<ul>
{{#each foods}}
  <li>{{foodName}} because they are {{foodAttribute}}.</li>
{{/each}}
</ul>
```

Output  
```
<p>I like eating the following foods:</p>
<ul>
  <li>Noodles because they are stringy.</li>
  <li>Tacos because they are crunchy.</li>
  <li>Ice cream sandwiches because they are cold.</li>
</ul>
```
