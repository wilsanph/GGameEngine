
function Scene ( sceneName ) {
	
	this.sceneName = sceneName;

	this.sceneID = "default";

	this.canvas = new PIXI.DisplayObjectContainer();
	Application.instance.canvas.addChild( this.canvas );
}


Scene.prototype.createInTransition = function createInTransition() {
	
};

Scene.prototype.createOutTransition = function createOutTransition() {
	
};


Scene.prototype.update = function update( dt ) {
	
};

Scene.prototype.free = function free() {
	
};


Scene.prototype.onUIPress = function onUIPress( element, event ) {
	// override this
};

Scene.prototype.onKeyDown = function onKeyDown( keycode ) {
	// override this
};

Scene.prototype.onKeyUp = function onKeyUp( keycode ) {
	// override this
};

Scene.prototype.onDebugDraw = function onDebugDraw( debugGraphics ) {
	// override this
};