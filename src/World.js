

/**
* @constructor
* @param {Game} game
* @param {Object} worldData
* @param {Object=} generalData
*/
function World ( game, worldData, generalData ) {
	/** @type {Game} */
	this.game = game;
	/** @type {PIXI.DisplayObjectContainer} */
	this.canvas = game.canvas;
	/** @type {Object} */
	this.worldData = worldData;
	/** @type {Object=} */
	this.generalData = generalData;

	this.camera = null;
	this.map = null;
	
	this.m_player = null;

	this.init();
}

World.prototype.init = function init() {
	this.camera = new Camera( this );
	this.map = new Map( this, this.worldData );

	this.m_player = new GBomberPlayer( this.canvas, 
									   this, 
									   0.5 * Application.APP_WIDTH, 
									   0.5 * Application.APP_HEIGHT,
									   {} );
};

World.prototype.update = function update ( dt ) {
	this.camera.update( dt );
	this.map.update( dt );
	this.m_player.update( dt );
};

World.prototype.onKeyDown = function onKeyDown( keyCode ) {
	if ( this.m_player !== null ) {
		
	}
	this.m_player.onKeyDown( keyCode );
};

World.prototype.onKeyUp = function onKeyUp( keyCode ) {
	this.m_player.onKeyUp( keyCode );
};


World.prototype.debugDraw = function ( debugGraphics ) {
	if ( this.map !== null ) {
		this.map.debugDraw( debugGraphics );
	}
	if ( this.m_player !== null ) {
		this.m_player.debugDraw( debugGraphics );
	}
};