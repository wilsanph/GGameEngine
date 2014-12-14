

/**
* @param {string} url
* @param {boolean} crossorigin
*/
function UILoader ( url, crossorigin ) {

	PIXI.JsonLoader.call( this, url, crossorigin );	

	
}


UILoader.prototype = Object.create( PIXI.JsonLoader.prototype );
UILoader.prototype.constructor = PIXI.JsonLoader;




UILoader.prototype.onJSONLoaded = function () {	

    if(!this.ajaxRequest.responseText )
    {
        this.onError();
        return;
    }
   
    this.json = JSON.parse(this.ajaxRequest.responseText);

	// use window["ui"] to save this data
	if ( this.json.ui ) {
		// If the animation data is in this json, then parse it
		for (var i = 0; i < this.json.ui.length; i++) {
			var scene = this.json.ui[i];
			var sceneName = scene["name"];
			var elements = scene["elements"];
			var movements = scene["movements"];

			window["ui"][sceneName] = { "elements": elements,
										"movements": movements };
		}
	}

	PIXI.JsonLoader.prototype.onJSONLoaded.call( this );
	console.log( "UILoader::onJSONLoaded> json file loaded" );
};
