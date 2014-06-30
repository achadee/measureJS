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

### Converting units

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

### Addition/Subtraction (value operator)

- Adding units uses the `add` method
- Subtracting units uses the `sub` method

you can add/subtract any type as long as it has a common base type

```erLang
weight = measure('5kg');
weight.add('5p').add('5 kilograms').sub(3g).sub('6kg');

weight.add(5); //--> adds 5 of the current type, in this case 'kg'
```

returns a measurement object that takes the initial condition as the type. The above example will return a value in kg since `weight = measure('5kg')` is initialised to 'kg'. If you require the unit to be converted after the addtion just chain it like so

```erLang
weight.add('5p').add('5 kilograms').add(3g).sub('6kg').to('tons');
```

### Multiplication/Division (unit operator)

- Multiplying units uses the `times` method
- Dividing units uses the `by` method

```erLang
TODO
```

### Customising your own units

Some systems may rely on custom units to intergrate seamlessly. To do this you need to provide a configuration JSON file/object

For an example we are going to create the `time` unit. note: the time unit has already been provided so it does not need to be implemented. 

1. Create a configuration file
2. Associate it with the unit you want to manipulate

#### Example configuration file (time)
```erLang
{
  [
	{
		unit: 's',
		multiplier: 1,
		name: 'second',
		plural: 'seconds'
	},
	{
		unit: 'min',
		multiplier: 0.0166666666, // 1/60 
		name: 'minute',
		plural: 'minutes'
	},
	{
		unit: 'hr',
		multiplier: 0.000277777777, // (1/60)/60
		name: 'hour',
		plural: 'hours'
	},
	{
		unit: 'ms',
		multiplier: 100
		name: 'millisecond',
		plural: 'milliseconds'
	},
	]
}

```

now you are ready to use the `time.json` you just created!

```erLang
var time = measure('5s').config('path\to\time.json');
```


