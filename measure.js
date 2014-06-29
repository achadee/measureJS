
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
	this.conversions = this.conversions.concat(tree);
	return this;
};

Measurement.prototype.to = function(newUnit){
	var applied = false;
	var val = this.value;
	var current = this.current;

	this.conversions.forEach(function(unit){
		/* handle all types to convert */
		if(newUnit == unit.unit || newUnit == unit.name || newUnit == unit.plural){
			val = (val / current.multiplier) * unit.multiplier;
			applied = unit;
		}
	});
	if(applied){
		/* stores the state fo the transition */
		this.current = applied;
		this.value = val;
	}
	else{
		/* if trying to convert to the same type just return measurement */
		if(newUnit === current){return this;}
		_err('input error', 'cannot find values to convert to', newUnit);
	}
	return this;
};

function parse_params(params){
	var instance = new Measurement();
	instance.current = {};
	instance.conversions = [];
	if(params){
		var value = params.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/);
		var unit = params.match(/[a-z]+[^0-9]/);
		if(!value || !unit){
			_err('parsing error', 'unable to parse values given', params);
		}
		else{
			instance.value = Number(value[0]);

			instance.current.unit = unit[0];
			instance.current.multiplier = 1;

			instance.state = 1;

			/* if it doesn't exist in conversions add it to the list */
			if(!contains(instance)){
				instance.conversions = instance.conversions.concat([instance.current]);
			}
		}
	}
	else{
		_err('input error', 'no value was provided', params);
	}
	return instance;
}


function contains(unit){
	var cur = unit.current;
	return unit.conversions.forEach(function(c){
		if(c === cur){return true;}
	});
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

return exports;