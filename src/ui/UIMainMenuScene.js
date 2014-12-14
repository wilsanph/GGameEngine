
function UIMainMenuScene ( sceneName ) {
	
	StateScene.call( this, sceneName );

	UIMainMenuScene.instance = this;
	
}

UIMainMenuScene.prototype = Object.create( StateScene.prototype );
UIMainMenuScene.prototype.constructor = StateScene;

UIMainMenuScene.instance = null;

UIMainMenuScene.prototype.onDebugDraw = function onDebugDraw( debugGraphics ) {
	StateScene.prototype.onDebugDraw.call( this, debugGraphics );
};

/**
* @override
* @param {UIButton} uiElement
* @param {PIXI.InteractionData} event
*/
UIMainMenuScene.prototype.onUIPress = function onUIPress( element, event ) {
	console.log( 'event: ' );
	console.log( event );
	console.log( 'element: ' );
	console.log( element );
	if ( element.name === 'btnMainMenuPlay' ) {
		TransitionManager.instance.changeState( 'transition2', SceneManager.UI_MAIN_MENU, SceneManager.UI_RPG_GAME );
	}
};