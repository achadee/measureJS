
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
		if(matching_list(newUnit, unit)){
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
		console.log(this);
		/* if trying to convert to the same type just return measurement */
		if(newUnit === current){return this;}
		_err('input error', 'The unit you are trying to convert does not exsit in the conversion list', newUnit);
	}
	return this;
};

function find_conversion(measurement, toLook){
	var index = -1;
	measurement.conversions.forEach(function(unit, i){

		if(matching_list(toLook, unit)){
			index = i;
		}
	});
	return index;
}

function matching_list(newUnit, unit){
	if (newUnit == unit.unit || newUnit == unit.name || newUnit == unit.plural){
		return true;
	}
	return false;
}

Measurement.prototype.add = function(measurement){
	var to_add = parse_params(measurement);
	var index = find_conversion(this, to_add.current.unit);
	console.log('index is: ', index);
	if(index != -1){
		//console.log(this.conversions[index]);
		this.value = ((this.value / this.current.multiplier) + ((to_add.value) / this.conversions[index].multiplier)) * this.current.multiplier;

	}
	else{
		_err('input error', 'The unit you are trying to add does not exsit in the conversion list', to_add.current.unit);
	}
	return this;
};

Measurement.prototype.sub = function(measurement){
	var to_add = parse_params(measurement);
	var index = find_conversion(this, to_add.current.unit);
	console.log('index is: ', index);
	if(index != -1){
		//console.log(this.conversions[index]);
		this.value = ((this.value / this.current.multiplier) - ((to_add.value) / this.conversions[index].multiplier)) * this.current.multiplier;

	}
	else{
		_err('input error', 'The unit you are trying to add does not exsit in the conversion list', to_add.current.unit);
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
				//_err('conflicting types warning', 'measure js is about to add this type to the conversions list', params);
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