
/**
* @param {string} sceneName
* @param {boolean=} isGameScene
* @extends {Scene}
*/
function StateScene ( sceneName, isGameScene ) {
	Scene.call( this, sceneName );
	
	this.sceneName = sceneName;
	this.data = null;
	this.uiElements = {};			
	this.isGameScene = ( typeof isGameScene === 'undefined' ) ? false : isGameScene;

	if ( !this.isGameScene ) {
		this.parseUI();	
	}	
}


StateScene.prototype = Object.create( Scene.prototype );
StateScene.prototype.constructor = Scene;

StateScene.prototype.parseUI = function parseUI() {
	this.data = window["ui"][this.sceneName];	

	var elements = this.data["elements"];

	for (var i = 0; i < elements.length; i++) {
		var uiObj = elements[i];
		var uiElement = null;
		switch ( uiObj["type"] ) {

			case "button":
				uiElement = new UIButton( uiObj["x"],
									      uiObj["y"],
					                      this, uiObj );
			break;

			case "clip":
				uiElement = new UIClip( uiObj["x"],
									    uiObj["y"],
					                    this, uiObj );
			break;

			case "text":
				uiElement = new UIText( uiObj["x"],
									    uiObj["y"],
					                    this, uiObj );
			break;

		}
		if ( uiElement !== null ) {
			this.uiElements[uiObj["id"]] = uiElement;
		}		
	}
};

/**
* @override
*/
StateScene.prototype.onDebugDraw = function onDebugDraw( debugGraphics ) {
	for ( var name in this.uiElements ) {
		this.uiElements[name].onDebugDraw( debugGraphics );
	}
};

/**
* @override
* @param {UIButton} uiElement
* @param {PIXI.InteractionData} event
*/
StateScene.prototype.onUIPress = function onUIPress( uiElement, event ) {
	
};

StateScene.prototype.free = function free() {
	for ( var id in this.uiElements ) {
		if ( this.uiElements !== null ) {
			this.uiElements[id].free();
			this.uiElements[id] = null;
		}
	}
};