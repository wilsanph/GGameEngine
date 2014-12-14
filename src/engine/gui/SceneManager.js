

function SceneManager () {
	
	SceneManager.instance = this;

	this.m_scenes = {};

	this.m_currentStateScene = null;
	this.m_currentTransitionScene = null;

	this.init();
}

SceneManager.instance = null;

SceneManager.UI_MAIN_MENU 	= "mainMenu";
SceneManager.UI_RPG_GAME 	= "rpgGame";
SceneManager.UI_ROOT 		= "root";


SceneManager.DEBUG_DRAW = true;

SceneManager.prototype.init = function init() {
	this.addScene( SceneManager.UI_ROOT, Scene, "rootScene" );
};

SceneManager.prototype.removeScene = function removeScene( idScene ) {
	if ( typeof this.m_scenes[idScene] === "undefined" ) {
		console.log( "SceneManager::removeScene> can't remove unregistered scene with id" + idScene );
		return;
	}

	if ( this.m_currentTransitionScene.sceneID === idScene ) {
		this.m_currentTransitionScene = null;
	}

	if ( this.m_currentStateScene.sceneID === idScene ) {
		this.m_currentStateScene = null;
	}

	if ( this.m_scenes[idScene] !== null ) {
		this.m_scenes[idScene].free();
		this.m_scenes[idScene] = null;
	}
};

SceneManager.prototype.addScene = function addScene( idScene, sceneClass, sceneName ) {
	if ( typeof this.m_scenes[idScene] !== "undefined" ) {
		if ( this.m_scenes[idScene] !== null ) {
			console.log( "SceneManager::addScene> There is already a scene with id " + idScene );
			return;
		}		
	}
	if ( this.m_currentStateScene !== null ) {
		console.log( "SceneManager::addScene> Changing the current scene " + this.m_currentStateScene.sceneName +
		   			 "to" + idScene );
	}

	this.m_scenes[idScene] = new sceneClass( sceneName );
	this.m_scenes[idScene].sceneID = idScene;

	this.m_currentStateScene = this.m_scenes[idScene];
};

SceneManager.prototype.addTransition = function addTransition( idScene, transitionClass, sceneName, oldScene, newScene, newSceneClass, newSceneName ) {
	if ( typeof this.m_scenes[idScene] !== "undefined" ) {
		if ( this.m_scenes[idScene] !== null ) {
			console.log( "SceneManager::addTransition> There is already a transition scene with id " + idScene );
			return;
		}		
	}
	if ( this.m_currentTransitionScene !== null ) {
		console.log( "SceneManager::addScene> Changing the current transition " + this.m_currentTransitionScene.sceneName +
		   			 "to" + idScene );		
	}
	var data = {};
	data["newSceneClass"] = newSceneClass;
	data["newSceneName"] = newSceneName;
	this.m_scenes[idScene] = new transitionClass( sceneName, oldScene, newScene, data );
	this.m_scenes[idScene].sceneID = idScene;

	this.m_currentTransitionScene = this.m_scenes[idScene];
};

SceneManager.prototype.update = function update( dt ) {
	if ( SceneManager.DEBUG_DRAW ) {
		this.debugDraw();
	}

	for ( var sceneID in this.m_scenes ) {
		if ( this.m_scenes[sceneID] !== null ) {
			this.m_scenes[sceneID].update( dt );
		}
	}
};

SceneManager.prototype.currentTransition = function currentTransition() {
	return this.m_currentTransitionScene;
};

SceneManager.prototype.currentScene = function currentScene() {
	return this.m_currentStateScene;
};

SceneManager.prototype.onKeyDown = function onKeyDown( keycode ) {
	for ( var sceneID in this.m_scenes ) {
		if ( this.m_scenes[sceneID] !== null ) {
			this.m_scenes[sceneID].onKeyDown( keycode );
		}
	}
};

SceneManager.prototype.onKeyUp = function onKeyUp( keycode ) {
	for ( var sceneID in this.m_scenes ) {
		if ( this.m_scenes[sceneID] !== null ) {
			this.m_scenes[sceneID].onKeyUp( keycode );
		}
	}
};

SceneManager.prototype.debugDraw = function debugDraw() {
	Application.instance.debugGraphics.clear();
	for ( var sceneID in this.m_scenes ) {
		if ( this.m_scenes[sceneID] !== null ) {
			this.m_scenes[sceneID].onDebugDraw( Application.instance.debugGraphics );
		}
	}	
};