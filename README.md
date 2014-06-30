measureJS
=========

## About
A node JS measurement utility to convert, manipulate and format units.

## Install
```erlang
TODO
```

## Setup
```erlang
var measure = require('measure');
var weight = measure('4kg');
weight.config(path/to/measurement/weights.json);
```
## Examples

# Converting units

Converting units to other types uses the `to` method

```erlang
weight.config(path/to/measurement/weights.json);
...
var weight = measure('4kg');

// --> all these do the same thing!
weight.to('pounds');
weight.to('p');

// --> you can also chain convertions, but you shouldn't need too
weight.to('pounds').to('kg').to('tons').to('grams').......
```

# Adding units

Adding units uses the `add` method, you can add any typ as long as it has a common bas type

```erLang
weight = measure('5kg');
weight.add('5p').add('5 kilograms').add(3g).add('6kg');
```

returns a measurement object that takes the initial condition as the type. The above example will return a value in kg since `weight = measure('5kg')` is initialised to 'kg'. If you require the unit to be converted after the addtion just chain it like so

```erLang
weight.add('5p').add('5 kilograms').add(3g).add('6kg').to('tons');
```

