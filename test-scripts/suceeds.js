var measure = require('../measure.js');

/* parsing tests */
var weight;
weight = measure('4kg'); //valid
weight = measure('-1kg'); //valid
weight = measure('4.6kg'); //valid

weight.config([
	{
		unit: 'g',
		multiplier: 0.001,
		name: 'gram',
		plural: 'grams'
	},
	{
		unit: 'T',
		multiplier: 1000,
		name: 'ton',
		plural: 'tons'
	},
	{
		unit: 'p',
		multiplier: 2.20462,
		name: 'pound',
		plural: 'pounds'
	}
	]);

console.log(weight.to('pounds').to('tons').to('pounds').to('pounds').to('grams').value);