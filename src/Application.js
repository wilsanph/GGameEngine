function Application () {
	
	Application.instance = this;

	this.stage = new PIXI.Stage( 0x66ff99, true );

	this.renderer = PIXI.autoDetectRenderer( Application.APP_WIDTH,
											 Application.APP_HEIGHT );

	document.body.appendChild( this.renderer.view )	;

	this.canvas = new PIXI.DisplayObjectContainer();
	this.stage.addChild( this.canvas );	

	this.debugGraphics = new PIXI.Graphics();
	this.debugContainer = new PIXI.DisplayObjectContainer();
	this.stage.addChild( this.debugContainer );
	this.debugContainer.addChild( this.debugGraphics );


	this.stage.mousedown = function ( eData ) {
		Application.instance.onMouseDown( eData );
	};

	// Add key listeners
	document.addEventListener( "keydown", function ( e ) {
		e.preventDefault();
		Application.instance.onKeyDown( e.keyCode );
	} );

	document.addEventListener( "keyup", function ( e ) {
		e.preventDefault();
		Application.instance.onKeyUp( e.keyCode );
	} );

	this.assetsList = ["media/textures/atlas_tut1.json",
					   "media/textures/atlas_players.json",
					   "media/maps/export/map1_atlas.json"];

	this.sceneManager = null;
	this.transitionManager = null;

	this.m_oldTime = 0;
	this.m_newTime = 0;
	this.m_deltaTime = 0;

	window["animations"] = {};
	window["ui"] = {};

	this.assetsLoader = new PIXI.AssetLoader( this.assetsList );
	this.assetsLoader.onComplete = this.onAssetsLoaded;
	this.assetsLoader.load();

	this.gameReady = false;

	this.jsonFilesToLoad = ["media/maps/export/map1.json"];
	this.jsonLoaders = [];
	this.jsonsLoaded = [];
	this.numJsonsLoaded = 0;
	for (var i = 0; i < this.jsonFilesToLoad.length; i++) {
		this.jsonsLoaded.push( false );
	}

	this.jsonData = [];

	// create an animation loader
	this.m_animationLoader = new AnimationLoader( "media/animations/player_red_walk.json", false );
	this.m_uiAnimationLoader = new AnimationLoader( "media/ui/ui_mainmenu.json", false );
	// create an ui loader
	this.m_uiLoader = new UILoader( "props/UI.json", false );

	for (var i = 0; i < this.jsonFilesToLoad.length; i++) {
		var loader = new PIXI.JsonLoader( this.jsonFilesToLoad[i] );
		this.jsonLoaders.push( loader );
	}
	this.jsonLoaders.push( this.m_animationLoader );
	this.jsonLoaders.push( this.m_uiAnimationLoader );
	this.jsonLoaders.push( this.m_uiLoader );

	// Load sounds	
	Application.config = window["config"];
	this.soundsLoaded = false;
	this.numSounds = Application.config["sounds"].length;
	this.m_numSoundsLoaded = 0;
	this.m_soundMap = {};

	this.loadSounds();
}

Application.config = null;
Application.AUDIO_PATH = "media/sounds/";

Application.prototype.loadSounds = function loadSounds() {
	if ( !createjs.Sound.initializeDefaultPlugins() ) {
		console.log( "Application::loadSounds> Couldn't initialize soundjs" );
		return;
	}

	var sounds = Application.config["sounds"];
	for ( var i = 0; i < sounds.length; i++ ) {
		this.m_soundMap[sounds[i]["id"]] = sounds[i]["src"];
	}

	//createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.addEventListener( "fileload", Application.instance.onLoadSoundProgress );
	createjs.Sound.registerManifest( sounds , Application.AUDIO_PATH );
};

Application.prototype.onLoadSoundProgress = function onLoadSoundProgress ( event ) {
	console.log( "Application::onLoadSoundProgress> sound " + event.src + " loaded" );
	Application.instance.m_numSoundsLoaded++;
	if ( Application.instance.m_numSoundsLoaded === Application.instance.numSounds ) {		
		console.log( "Application::onLoadSoundProgress> finished loading all sounds" );
		Application.instance.onSoundsLoaded();
	}
};

Application.prototype.onSoundsLoaded = function onSoundsLoaded() {
	this.soundsLoaded = true;
};

Application.prototype.playSound = function ( id, loops ) {
	if ( typeof this.m_soundMap[id] === "undefined" ) {
		console.log( "Application::playSound> sound with id " + id + " not registered" );
	}
	createjs.Sound.play( Application.AUDIO_PATH + this.m_soundMap[id], { loop : -1 } );
};

Application.prototype.onAnimationsLoaded = function onAnimationsLoaded() {
	//console.log( "onAnimationsLoaded" );	
};


Application.prototype.startToLoadJSON = function startToLoadJSON() {
	for (var i = 0; i < this.jsonLoaders.length; i++) {
		this.jsonLoaders[i].on( 'loaded', Application.instance.onLoadProgress );
		this.jsonLoaders[i].load();
	}
};

Application.prototype.onLoadProgress = function onLoadProgress( e ) {
	console.log( "Application::onLoadProgress> Loaded " + ( ++Application.instance.numJsonsLoaded ) + " files" );
	Application.instance.jsonData.push( e.content.json );
	if ( Application.instance.numJsonsLoaded >= Application.instance.jsonLoaders.length ) {
		Application.instance.gameReady = true;
		Application.instance.onGameReady();
	}
};

Application.prototype.onAssetsLoaded = function onAssetsLoaded() {
	console.log( "Application::onAssetsLoaded> Finished loading assets" );
	//Application.instance.game = new Game( Application.instance.canvas );
	Application.instance.startToLoadJSON();
};

Application.instance = null;
Application.APP_WIDTH = 1024;
Application.APP_HEIGHT = 768;

Application.prototype.onGameReady = function onGameReady() {
	this.sceneManager 		= new SceneManager();
	this.transitionManager	= new TransitionManager();

	// Create the transitions and states
	this.transitionManager.addTransition( SceneManager.UI_ROOT,
										  SceneManager.UI_MAIN_MENU,
										  TransitionScene,
										  'transition1',
										  UIMainMenuScene,
										  'mainmenu' );
	this.transitionManager.addTransition( SceneManager.UI_MAIN_MENU,
	                                      SceneManager.UI_RPG_GAME,
	                                      TransitionScene,
	                                      'transition2',
	                                      UIGameScene,
	                                      SceneManager.UI_RPG_GAME );
	this.transitionManager.changeState( 'transition1',
										SceneManager.UI_ROOT,
		                                SceneManager.UI_MAIN_MENU );
};

Application.prototype.update = function update() {	
	this.m_newTime = Date.now();
	this.m_deltaTime = this.m_newTime - this.m_oldTime;
	this.m_oldTime = this.m_newTime;

	/**
	if ( this.gameReady ) {
		this.onGameReady();
		this.gameReady = false;
	}
	*/
	
	if ( this.sceneManager !== null && this.transitionManager !== null ) {
		this.sceneManager.update( this.m_deltaTime );		
	}
	
};

Application.prototype.onKeyDown = function onKeyDown( keycode ) {
	if ( this.sceneManager !== null ) {
		this.sceneManager.onKeyDown( keycode );
	}
};

Application.prototype.onKeyUp = function onKeyUp( keycode ) {
	if ( this.sceneManager !== null ) {
		this.sceneManager.onKeyUp( keycode );
	}
};

Application.prototype.onMouseDown = function onMouseDown( eData ) {
	console.log( "x: " + eData.global.x + ", y: " + eData.global.y );
	if ( this.sceneManager !== null ) {
		this.sceneManager.onPointerPress( eData );
	}
};


/**
 * Inherit the prototype methods from one constructor into another.
 * extended classes have the property [parent] for calling parent methods.
 * @param {Function} childConstructor Child class constructor.
 * @param {Function} parentConstructor Parent class constructor.
 */
Application.subclass = function ( childConstructor, parentConstructor ) {
    /** @constructor */
    function temporalConstructor() { };
    temporalConstructor.prototype = parentConstructor.prototype;
    childConstructor.prototype = new temporalConstructor();
    /** @override */
    childConstructor.prototype.constructor = childConstructor;
};