
/**
* @param {string} sceneName
* @param {string} oldScene
* @param {string} newScene
* @param {Object} newSceneData
* @extends {Scene}
*/
function TransitionScene ( sceneName, oldScene, newScene, newSceneData ) {
	Scene.call( this, sceneName );	

	this.oldScene = oldScene;
	this.newScene = newScene;

	this.newSceneData = newSceneData;

	this.finished = false;

	this.onEnter();
}


TransitionScene.prototype = Object.create( Scene.prototype );
TransitionScene.prototype.constructor = Scene;

TransitionScene.prototype.update = function update( dt ) {
	// Override this
	if ( !this.finished ) {
		this.finished = true;
		this.onExit();
	}	
};

TransitionScene.prototype.onEnter = function onEnter() {
	// Override this
};

TransitionScene.prototype.onExit = function onExit() {
	// Override this
	SceneManager.instance.removeScene( this.oldScene );
	SceneManager.instance.addScene( this.newScene,
	                                this.newSceneData["newSceneClass"],
	                                this.newSceneData["newSceneName"] );
};