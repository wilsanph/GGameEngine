

/**
* @param {string} url
* @param {boolean} crossorigin
*/
function AnimationLoader ( url, crossorigin ) {

	PIXI.JsonLoader.call( this, url, crossorigin );	

	
}


AnimationLoader.prototype = Object.create( PIXI.JsonLoader.prototype );
AnimationLoader.prototype.constructor = PIXI.JsonLoader;




AnimationLoader.prototype.onJSONLoaded = function () {	

    if( !this.ajaxRequest.responseText ) {
        this.onError();
        return;
    }
   
    this.json = JSON.parse( this.ajaxRequest.responseText );

	// use window["animations"] to save this data
	if ( this.json.animations && this.json.textureMapping ) {
		// If the animation data is in this json, then parse it
		for ( var i = 0; i < this.json.animations.length; i++ ) {
			var name = this.json.animations[i]["name"];
			var fps = this.json.animations[i]["fps"];
			var numFrames = this.json.animations[i]["numFrames"];
			var frames = this.json.animations[i]["frames"];
			var textureMap = this.json.textureMapping;
			window["animations"][name] = { "fps": fps,
										   "totalFrames": numFrames,
										   "textureMap": textureMap,
										   "frames": frames };
		}
	}

	PIXI.JsonLoader.prototype.onJSONLoaded.call( this );
	console.log( "AnimationLoader::onJSONLoaded> json file loaded" );



};
