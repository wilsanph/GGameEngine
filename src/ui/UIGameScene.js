/**
* @constructor
* @param {string} sceneName
*/
function UIGameScene ( sceneName ) {
	StateScene.call( this, sceneName, true );

	UIGameScene.instance = this;
	
	this.game = new Game( this.canvas );
}

UIGameScene.prototype = Object.create( StateScene.prototype );
UIGameScene.prototype.constructor = StateScene;

UIGameScene.instance = null;

UIGameScene.prototype.onDebugDraw = function onDebugDraw( debugGraphics ) {
	StateScene.prototype.onDebugDraw.call( this, debugGraphics );
};

UIGameScene.prototype.onKeyDown = function onKeyDown( keycode ) {
	if ( this.game !== null ) {
		this.game.onKeyDown( keycode );
	}
};

UIGameScene.prototype.onKeyUp = function onKeyUp( keycode ) {
	if ( this.game !== null ) {
		this.game.onKeyUp( keycode );
	}
};

UIGameScene.prototype.onPointerPress = function ( eData ) {
	if ( this.game !== null ) {
		this.game.onPointerPress( eData );
	}
	if ( GSandbox.instance !== null ) {
		GSandbox.instance.onPointerPress( eData.originalEvent.which,
										  eData.global.x,
										  eData.global.y );
	}
};

UIGameScene.prototype.update = function update( dt ) {
	if ( this.game !== null ) {
		this.game.update( dt );
	}
};