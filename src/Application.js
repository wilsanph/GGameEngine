


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


	this.stage.mousedown = function  ( eData ) {
		Application.instance.onMouseDown( eData );
	};	

	this.assetsList = ["media/textures/atlas_tut1.json",
					   "media/textures/atlas_players.json",
					   "media/maps/export/map1_atlas.json"];

	// Add key listeners
	document.addEventListener("keydown", function ( e ) {
		e.preventDefault();
		Application.instance.onKeyDown( e.keyCode );
	});

	document.addEventListener("keyup", function ( e ) {
		e.preventDefault();
		Application.instance.onKeyUp( e.keyCode );
	});

	this.sceneManager = null;
	this.transitionManager = null;
	this.game = null;//new Game( this.canvas );

	this.oldTime = 0;
	this.newTime = 0;
	this.deltaTime = 0;

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
		/*
		loader.on( 'loaded', function (e) {
			Application.instance.jsonData.push( e.content.json );
		} );
		*/		
		this.jsonLoaders.push( loader );
	}
	this.jsonLoaders.push( this.m_animationLoader );
	this.jsonLoaders.push( this.m_uiAnimationLoader );
	this.jsonLoaders.push( this.m_uiLoader );
	//this.startToLoadJSON();	

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
	this.playSound( "SND_GAMEPLAY_1", -1 );
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

Application.prototype.onMouseDown = function onMouseDown( eData ) {
	console.log( "eventMouseDown" );
	console.log( "x: " + eData.global.x + ", y: " + eData.global.y );
	if ( this.game !== null ) {
		this.game.onMouseDown( eData.global.x, eData.global.y );
	}
};

Application.prototype.onGameReady = function onGameReady() {
	if ( Application.instance.game !== null ) {
		return;	
	}
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
	/*
	this.transitionManager.addTransition( SceneManager.UI_MAIN_MENU,
										  SceneManager.UI_RPG_GAME,
										   )
	*/
	//this.sceneManager.gotoScene( SceneManager.UI_MAIN_MENU );
	//this.game = new Game( Application.instance.canvas );
};

Application.prototype.update = function update() {	
	this.newTime = Date.now();
	this.deltaTime = this.newTime - this.oldTime;
	this.oldTime = this.newTime;

	/**
	if ( this.gameReady ) {
		this.onGameReady();
		this.gameReady = false;
	}
	*/
	
	if ( this.sceneManager !== null && this.transitionManager !== null ) {
		this.sceneManager.update( this.deltaTime );		
	}
	
	/*
	if ( this.game !== null ) {				
		this.game.update( this.deltaTime );
	}
	*/
	
};

Application.prototype.onKeyDown = function onKeyDown( keycode ) {
	console.log( "onKeyDown" );
	if ( this.sceneManager !== null ) {
		this.sceneManager.onKeyDown( keycode );
	}
};

Application.prototype.onKeyUp = function onKeyUp( keycode ) {
	console.log( "onKeyUp" );
	if ( this.sceneManager !== null ) {
		this.sceneManager.onKeyUp( keycode );
	}
};
