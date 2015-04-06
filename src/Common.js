
function Common () {}

Common.getTileName = function getTileName( tileBaseName, num ) {
	if ( num < 10 ) {
		return tileBaseName + "0" + num;
	}
	return tileBaseName + num;
}

Common.validateNum = function validateNum ( num, defaultValue ) {
	var validatedValue = ( typeof num === "undefined" ) ? defaultValue : num;
	validatedValue = ( isNaN( validatedValue ) ) ? defaultValue : validatedValue;
	return validatedValue;
};

Common.KEY_LEFT = 37;
Common.KEY_UP = 38;
Common.KEY_RIGHT = 39;
Common.KEY_DOWN = 40;