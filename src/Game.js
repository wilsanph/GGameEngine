


function Game( canvas ){

	this.socket = null;

	//this.texture = PIXI.Texture.fromImage( "bunny.png" );
	this.texture = PIXI.Texture.fromFrame( Game.ASSETS_NAMES["bunny"] );
	this.bunny = new PIXI.Sprite( this.texture );
	this.canvas = canvas;

	this.gameBounds = new Rectangle( Game.GAME_AREA_LEFT,
									 Game.GAME_AREA_TOP,
									 Game.GAME_AREA_RIGHT - 40,
									 Game.GAME_AREA_BOTTOM - 40 );

	this.debugContainer = null;

	if ( Game.DEBUG_DRAW ) {
		this.debugGraphics = new PIXI.Graphics();
		this.debugContainer = new PIXI.DisplayObjectContainer();
		this.canvas.addChild( this.debugContainer );
		this.debugContainer.addChild( this.debugGraphics );
	}

	/** @type {World} */
	this.world = null;

	this.init();
}
Game.ASSETS_NAMES = { bunny: "bunny.png", 
					  particle: "particle1.png",
					  eli : "player_elizabeth.png",
					  juanca : "player_juancarlos.png",
					  saurio : "player_juanmanuel.png" };

Game.MAX_DELTA = 50;

Game.DEBUG_DRAW = true;

Game.GAME_AREA_TOP = 20;
Game.GAME_AREA_LEFT = 20;
Game.GAME_AREA_BOTTOM = Application.APP_HEIGHT - 20;
Game.GAME_AREA_RIGHT = Application.APP_WIDTH - 20;


Game.prototype.init = function init() {
	//this.socket = io.connect( 'http://localhost', { port: 8001 } );
	//this.setClientListeners();
	this.world = new World( this, 
							Application.instance.jsonData[0],
							null );
};

Game.prototype.setClientListeners = function setClientListeners() {
	this.socket.on( 'connect', this.onSocketConnected );
	this.socket.on( 'disconnect', this.onSocketDisconnected );
	this.socket.on( 'new player', this.onSocketNewPlayer );
	this.socket.on( 'move player', this.onSocketMovePlayer );
	this.socket.on( 'remove player', this.onSocketRemovePlayer );
};

Game.prototype.onSocketConnected = function onSocketConnected() {
	console.log( 'Game::onSocketConnected> ' );
};

Game.prototype.onSocketDisconnected = function onSocketDisconnected() {
	console.log( 'Game::onSocketDisconnected> ' );	
};

Game.prototype.onSocketNewPlayer = function onSocketNewPlayer( data ) {
	console.log( 'Game::onSocketNewPlayer> ' );
	console.log( 'Game::onSocketNewPlayer> data: ' );
	console.log( data );
};

Game.prototype.onSocketMovePlayer = function onSocketMovePlayer( data ) {
	console.log( 'Game::onSocketMovePlayer> ' );
	console.log( 'Game::onSocketMovePlayer> data: ' );
	console.log( data );
};

Game.prototype.onSocketRemovePlayer = function onSocketRemovePlayer( data ) {
	console.log( 'Game::onSocketRemovePlayer> ' );
	console.log( 'Game::onSocketRemovePlayer> data: ' );
	console.log( data );
};


Game.prototype.update = function update( dt ) {
	this.debugDraw();		
	
	dt = ( dt > Game.MAX_DELTA ) ? Game.MAX_DELTA : dt;
	this.world.update( dt );	
};

Game.prototype.onMouseDown = function onMouseDown( x, y ) {	
	
};

Game.prototype.onKeyDown = function onKeyDown ( keycode ) {
	if ( this.world !== null ) {
		this.world.onKeyDown( keycode );
	}
};

Game.prototype.onKeyUp = function onKeyUp ( keycode ) {
	if ( this.world !== null ) {
		this.world.onKeyUp( keycode );
	}	
};

Game.prototype.debugDraw = function debugDraw() {
	this.debugGraphics.clear();
	this.debugGraphics.lineStyle( 2, 0x0000ff, 1 );
	this.debugGraphics.drawRect( this.gameBounds.x, this.gameBounds.y,
								 this.gameBounds.w, this.gameBounds.h );
	
};

