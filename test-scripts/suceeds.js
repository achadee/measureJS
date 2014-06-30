var measure = require('../measure.js');

/* parsing tests */
var weight;
weight = measure('4kg'); //valid

weight.config([
	{
		unit: 'g',
		multiplier: 1000,
		name: 'gram',
		plural: 'grams'
	},
	{
		unit: 'T',
		multiplier: 0.001,
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

console.log(weight.to('pounds').to('kg').to('grams').add('5kg'));