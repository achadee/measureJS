var measure = require('../measure.js');

weight = measure('6s22'); //not valid
weight = measure ('ss66'); //not valid
weight = measure('s6'); //not valid
weight = measure(); //not valid

weight.config([
	{
		unit: 'g',
		multiplier: 0.001,
		name: 'gram',
		plural: 'grams'
	},
	{
		unit: 'T',
		multiplier: 0, //not valid 
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