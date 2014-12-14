
function TransitionManager () {
	
	TransitionManager.instance = this;

	this.m_transitions = {};

	this.currentTransition = null;
}

TransitionManager.instance = null;

/**
* @param {string} oldScene
* @param {string} newScene
* @param {string} transition
* @param {string} newSceneClass
* @param {string} newSceneName
*/
TransitionManager.prototype.addTransition = function addTransition( oldScene, newScene, transition, transitionID, newSceneClass, newSceneName ) {
	// If there are no transitions with start scene "oldScene", then create one
	if ( typeof this.m_transitions[oldScene] === "undefined" ) {
		this.m_transitions[oldScene] = {};
	}
	// Register this transition
	this.m_transitions[oldScene][newScene] = { "transicionID" : transitionID,
											   "transitionClass" : transition,
	                           				   "newSceneClass" : newSceneClass,
	                           				   "newSceneName" : newSceneName };
};

/**
* @param {string} oldScene
* @param {string} newScene
* @return {boolean} success flag -> true if the transition was executed, false if not
*/
TransitionManager.prototype.changeState = function changeState( transitionScene, oldScene, newScene ) {
	// Check if there are transition beginning with oldScene
	if ( typeof this.m_transitions[oldScene] === "undefined" ) {
		console.log( "TransitionManager::changeState> There are no transitions" +
					 " starting with " + oldScene );
		return false;
	}
	if ( typeof this.m_transitions[oldScene][newScene] === "undefined" ) {
		console.log( "TransitionManager::changeState> There are no transitions" +
					 " starting with " + oldScene + " and going to " + newScene );
		return false;		
	}

	if ( SceneManager.instance.currentScene().sceneID !== oldScene ) {
		console.log( "TransitionManager::changeState> The current scene " + SceneManager.instance.currentScene().sceneID +
					 " is not " + oldScene );
		return;
	}

	this.currentTransition = this.m_transitions[oldScene][newScene];
	if ( this.currentTransition !== null ) {
		SceneManager.instance.addTransition( transitionScene,
		                                	 this.currentTransition["transitionClass"],
		                                	 "",
		                                	 oldScene, newScene,
		                                	 this.currentTransition["newSceneClass"],
		                                	 this.currentTransition["newSceneName"] );
	}
	else {
		// If there is no transition between this scenes, send a warning
		console.log( "TransitionManager::changeState> This transition is empty" );
		return;
	}
};

/**
* Callback called by the current transition when it finishes
* @param {TransitionScene} transition 
*/
TransitionManager.prototype.onEndTransition = function onEndTransition( transition ) {
	
};