
var ENV = 'testing';

function Measurement(params) {

}

Measurement.prototype.format = function (style) {
   
   return new Measurement(style);
};

Measurement.prototype.config = function (tree) {
   this.conversions = tree;
   return this;
};

Measurement.prototype.to = function(newUnit){
	
}

function parse_params(params){
	var instance = new Measurement();
	if(params){
		var value = params.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/);
		var unit = params.match(/[a-z]+[^0-9]/);
		if(!value || !unit){
			_err('parsing error', 'unable to parse values given', params);
		}
		else{
			instance.value = value[0];
			instance.unit = unit[0];
		}
	}
	else{
		_err('input error', 'no value was provided', params);
	}
	return instance;
}



module.exports = function (params) {
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