
var ENV = 'testing';

function Measurement(params) {



}

Measurement.prototype.format = function (style) {
   
   return new Measurement(style);
};

Measurement.prototype.config = function (tree) {
	tree.forEach(function(leaf){
		if(leaf.multiplier === 0){
			_err('config error', 'multiplier cannot equal 0', JSON.stringify(leaf));
		}
	});
	this.conversions = tree;
	return this;
};

Measurement.prototype.to = function(newUnit){
	var applied = false;
	var val = this.value;
	var divisor = this.state;
	var current = this.current;

	this.conversions.forEach(function(unit){
		/* handle all types to convert */
		if(newUnit == unit.unit || newUnit == unit.name || newUnit == unit.plural){
			val = (val / divisor) * unit.multiplier;
			applied = unit;
		}
	});
	if(applied){
		/* stores the state fo the transition */
		this.current = applied;
		this.state = applied.multiplier;
		this.value = val;
	}
	else{
		/* if trying to convert to the same type just return measurement */
		if(unit === current){return this;}
		_err('input error', 'cannot find values to convert to', newUnit);
	}
	return this;
};

function parse_params(params){
	var instance = new Measurement();
	if(params){
		var value = params.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/);
		var unit = params.match(/[a-z]+[^0-9]/);
		if(!value || !unit){
			_err('parsing error', 'unable to parse values given', params);
		}
		else{
			instance.value = Number(value[0]);
			instance.unit = unit[0];
			instance.state = 1;
		}
	}
	else{
		_err('input error', 'no value was provided', params);
	}
	return instance;
}



module.exports = function (params) {
	var current_template = {
		value: 0,
		conversions : [{
			unit: 'g',
			multiplier: 0.001,
			name: 'gram',
			plural: 'grams'
		}],
		state: 1,
		current: {
			unit: 'g',
			multiplier: 0.001,
			name: 'gram',
			plural: 'grams'
		}
	};
	return parse_params(params);
};

function _err(errTyp, err, value){
	console.log(errTyp.toUpperCase() + ": " + err + ' ' +  '\'' + value + '\'');
}

function console_debug(param){
	if(ENV === 'testing'){
		console.log('[TEST] ' + param);
	}
}

return exports;